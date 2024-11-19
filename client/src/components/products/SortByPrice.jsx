const SortByPrice = ({setSort}) => {
  return (
    <select className="select select-bordered w-full rounded-none" onChange={(e) => setSort(e.target.value)}>
      <option value='asc'>Low to High</option>
      <option value='desc'>High to Low</option>
    </select>
  );
};

export default SortByPrice;
