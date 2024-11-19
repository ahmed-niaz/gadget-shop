const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);
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

// token verification
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.send({ message: "No token" });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.send({ message: "invalid token" });
    }
    req.decoded = decoded;
    next();
  });
};

// verify seller
const verifySeller = async (req, res, next) => {
  const query = { email: req.decoded.email };
  const user = await userCollection.findOne(query);
  if (user?.role !== "seller") {
    return res.send({ message: "as seller forbidden access" });
  }
  next();
};

const userCollection = client.db("gadget-shop").collection("users");
const productCollection = client.db("gadget-shop").collection("product");

const dbConnect = async () => {
  try {
    client.connect();
    console.log(`Database connected successfully`);

    // get all the user
    app.get("/user", async (req, res) => {
      try {
        const result = await userCollection.find().toArray();
        res.status(200).send(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // get user based on email
    app.get("/user/:email", async (req, res) => {
      try {
        const query = { email: req.params.email };
        const result = await userCollection.findOne(query);
        res.status(200).send(result);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // get all product
    // app.get("/product", async (req, res) => {
    //   try {
    //     const result = await productCollection.find().toArray();
    //     res.status(200).send(result);
    //   } catch (err) {
    //     console.error("Error fetching user data:", error.message);
    //     res.status(500).send({ message: "Internal Server Error" });
    //   }
    // });

    app.get("/all-products", async (req, res) => {
      // name searching
      // sort by price
      // filter by category
      // filter by brand

      const { title, sort, category, brand } = req.query;
      const query = {};
      if (title) {
        query.title = { $regex: title, $options: "i" };
      }

      if (category) {
        query.category = category;
      }

      if (brand) {
        query.brand = brand;
      }

      const sortOption = sort === "asc" ? 1 : -1;

      const products = (
        await productCollection
        .find(query)
        .sort({ price: sortOption })
        .toArray()
      );

      const productInfo = await productCollection
        .find({}, { projection: { category: 1, brand: 1 } })
        .toArray();

      const totalProducts = await productCollection.countDocuments(query);
      const brands = [...new Set(productInfo.map((product) => product.brand))];
      const categories = [
        ...new Set(productInfo.map((product) => product.category)),
      ];
      res.json({products,totalProducts,brands,categories});
    });

    // add product
    app.post("/add-products", verifyToken, verifySeller, async (req, res) => {
      try {
        const product = req.body;
        const result = await productCollection.insertOne(product);
        res.send(result);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    });

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
