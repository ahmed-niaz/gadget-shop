import ProductCard from "../shared/ProductCard"


const FeaturedProducts = () => {
  return (
    <section className="lg:flex items-center justify-between gap-4 ">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </section>
  )
}

export default FeaturedProducts