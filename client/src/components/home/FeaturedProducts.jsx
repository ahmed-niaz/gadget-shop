import { useQuery } from "@tanstack/react-query";
import ProductCard from "../shared/ProductCard";
import axios from "axios";
import Loading from "../shared/Loading";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"], // Corrected query key as a string
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`
      );
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
console.log(products);
  return (
    <section className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default FeaturedProducts;
