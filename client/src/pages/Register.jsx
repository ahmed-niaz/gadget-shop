import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import GoogleLogin from "../components/shared/GoogleLogin";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   const email = data.email;
  //   const role = data.role;
  //   const status = role === "buyer" ? "approved" : "pending";
  //   const wishList = [];

  //   const userData = { email, role, status, wishList };
  //   console.log(userData);
  //   createUser(data.email, data.password).then(() => {
  //     axios
  //       .post(`${import.meta.env.VITE_API_URL}/users`, userData)
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   });
  //   // navigate("/");
  // };

  const mutation = useMutation({
    mutationFn: (userData) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
    },
    onSuccess: (data) => {
      console.log("User successfully created:", data);
      toast.success(`User successfully created`);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error(`Error creating user`);
    },
  });

  const onSubmit = async (data) => {
    const email = data.email;
    const role = data.role;
    const status = role === "buyer" ? "approved" : "pending";
    const wishList = [];
    const userData = { email, role, status, wishList };

    try {
      await createUser(data.email, data.password);

      mutation.mutate(userData);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message);
    }
  };
  // google login

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-pink-700 text-sm ">email required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <span className="text-pink-700 text-sm ">
                  Password required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-pink-700 text-sm ">
                  Password must have 6 characters
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return `your password do not match`;
                    }
                  },
                })}
              />
              {errors.confirmPassword?.type && (
                <span className="text-pink-700 text-sm ">
                  Both password must match
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("role", { required: true })}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role && (
                <span className="text-pink-700 text-sm ">
                  Must select the role
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <hr />
            <div>
              <div className="w-full items-center flex justify-center">
                <GoogleLogin />
              </div>
            </div>
            <p className="my-4 text-gray-400">
              already have an account? <Link to="/register">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
