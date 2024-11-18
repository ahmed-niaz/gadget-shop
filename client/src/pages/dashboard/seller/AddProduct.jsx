import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: ({ productList, token }) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/add-products`,
        productList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log("Product successfully added:", data);
      toast.success(`Product successfully added`);
      navigate("/");
    },
  });

  //   onSubmit

  const onSubmit = async (data) => {
    const title = data.title;
    const brand = data.brand;
    const price = parseFloat(data.price);
    const stock = parseFloat(data.stock);
    const category = data.category;
    const image = data.image_url;
    const description = data.description;
    const sellerEmail = user?.email;
    const productList = {
      title,
      brand,
      price,
      stock,
      category,
      image,
      description,
      sellerEmail,
    };

    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("Authentication token is missing. Please log in.");
      return;
    }
    console.log(productList);

    try {
      await mutation.mutateAsync({ productList, token });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message);
    }
  };
  return (
    <main>
      <h2 className="text-2xl font-bold text-center mb-12">Add Product</h2>
      {/* form */}
      <section className="w-10/12 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Product title"
                className="input input-bordered"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-pink-700 text-sm ">title required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Brand</span>
              </label>
              <input
                type="text"
                placeholder="Product Brand"
                className="input input-bordered"
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <span className="text-pink-700 text-sm ">Brand required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Price</span>
              </label>
              <input
                type="price"
                placeholder="Product Price"
                className="input input-bordered"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-pink-700 text-sm ">Price required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Stock</span>
              </label>
              <input
                type="text"
                placeholder="Stock Quantity"
                className="input input-bordered"
                {...register("stock", { required: true })}
              />
              {errors.stock && (
                <span className="text-pink-700 text-sm ">
                  stock is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Category</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("category", { required: true })}
              >
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="wearables">Wearables</option>
              </select>
              {errors.category && (
                <span className="text-pink-700 text-sm ">
                  Must select the role
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                {...register("image_url", { required: true })}
              />
              {errors.image_url && (
                <span className="text-pink-700 text-sm ">
                  image url is required
                </span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Product Description"
              className="input input-bordered min-h-[100px]"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-pink-700 text-sm ">
                need proper description
              </span>
            )}
          </div>
          <div className="my-8 flex justify-center items-center">
            <button className="border px-4 py-2 bg-black text-white font-bold ">
              Add Product
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddProduct;

// axios.post(`${import.meta.env.VITE_API_URL}/add-products`, productList,{headers: {
//     Authorization: `Bearer ${token}`
// }}).then(res=> console.log(res));
