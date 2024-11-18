const ProductCard = ({ product }) => {
  const { brand, category, title, description, price, image } = product;
 console.log(product);
  return (
    <div className="card shadow-xl w-full">
      <figure>
        <img
          src={image} 
          alt={title}
          className="h-28 w-1/2 object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description }</p>
        <p className="text-gray-500 text-sm">Brand: {brand}</p>
        <p className="text-gray-500 text-sm">Category: {category}</p>
        <p className="font-bold text-lg">${price?.toFixed(2)}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
