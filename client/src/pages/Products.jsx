import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/shared/Loading";
import ProductCard from "../components/shared/ProductCard";

import FilterBar from "../components/products/FilterBar";
import SearchBar from "../components/products/SearchBar";
import SortByPrice from "../components/products/SortByPrice";
import { useEffect, useState } from "react";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  // Log filter values whenever they change
  useEffect(() => {
    console.log('search',search);
    console.log("Sort:", sort);
    console.log("Brand:", brand);
    console.log("Category:", category);
  }, [search,sort, brand, category]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"], // Corrected query key as a string
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-products`
      );
      return response.data;
    },
  });
  if (isLoading) return <Loading />;
  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };

  // handle reset
  const handleReset = () => {
    setBrand("");
    setSearch("");
    setCategory("");
    setSort("asc");
    window.location.reload()
  };

  return (
    <main className="container mx-auto">
      <h2 className="font-bold text-center my-8 text-3xl">All Products</h2>
      <section className="lg:flex items-center justify-between">
        <div>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="w-[200px]">
          <SortByPrice setSort={setSort} />
        </div>
      </section>
      {/* content */}
      <section className="grid grid-cols-12 mt-5">
        <div className="col-span-2">
          <FilterBar
            setBrand={setBrand}
            setCategory={setCategory}
            handleReset={handleReset}
          />
        </div>
        <div className="col-span-10 px-8">
          <section>
            {products.length === 0 ? (
              <div className="grid place-items-center w-full min-h-screen text-2xl font-extrabold">
                <h2>No Product Found</h2>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {products.map((product, idx) => (
                  <ProductCard key={idx} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
      {/* product Card */}
    </main>
  );
};

export default Products;
