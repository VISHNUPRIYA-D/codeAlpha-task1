import { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { userContext } from "../context/userContext";

const Products = () => {
  const { getAllProducts, products, filteredProducts} = useContext(userContext);
  useEffect(()=>{
    getAllProducts();
  },[]);
 
  return (
  <div className="pt-24 mx-4">
  <ProductCard products={filteredProducts} />

  </div>);
};
export default Products;
