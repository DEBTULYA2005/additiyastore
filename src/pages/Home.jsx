import Banner from "../components/Banner";
import ProductList from "../components/ProductList";

export default function Home({ products, addToCart }) {
  return (
    <>
      <Banner />
      <ProductList products={products} addToCart={addToCart} />
    </>
  );
}