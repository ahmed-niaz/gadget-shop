const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterone.lxvfmw8.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// jwt
app.post("/jwt", async (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.JWT_TOKEN, {
    expiresIn: "123d",
  });
  res.send({ token });
});

const userCollection = client.db("gadget-shop").collection("users");
const productCollection = client.db("gadget-shop").collection("product");

const dbConnect = async () => {
  try {
    client.connect();
    console.log(`Database connected successfully`);

    // insert user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const isExist = await userCollection.findOne(query);

      if (isExist) {
        return res.send({ message: `user already exist` });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } catch (error) {
    console.log(error.name, error.message);
  }
};

dbConnect();

// api
app.get("/", async (req, res) => {
  res.send("gadget shop server is running 😎");
});

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});

// make api -> JWT token -> client -> local Storage [authentication & authorization]