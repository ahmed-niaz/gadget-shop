import { ArrowDownAZ, ListRestart } from "lucide-react";

const FilterBar = ({
  setBrand,
  setCategory,
  handleReset,
  brands,
  categories,
}) => {

  console.log(categories);
  console.log(brands);
  return (
    <section className="bg-slate-100  p-4">
      <div className="flex items-center  gap-2">
        <span>
          <ArrowDownAZ />
        </span>
        <h2 className="text-xl font-bold">Filters </h2>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <div>
          <select
            className="select select-bordered w-full rounded-none"
            onChange={(e1) => setBrand(e1.target.value)}
          >
            {brands.map((brand) => (
              <option key={brand._id} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="select select-bordered w-full rounded-none"
            onChange={(e2) => setCategory(e2.target.value)}
          >
            {categories.map((category) => (
             
              <option key={category._id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleReset}
        className="p-2 bg-black text-white w-full flex items-center gap-2 justify-center mt-8"
      >
        <h2>Reset</h2>
        <ListRestart size={32} />
      </button>
    </section>
  );
};

export default FilterBar;
