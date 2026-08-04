import { useContext } from "react"
import { userContext } from "../context/userContext"
import ProductCard from "../components/ProductCard"
const BestSellers = () =>{
    const {bestSellerProducts} = useContext(userContext);
    return(
        <div className="pt-24 mx-4">

        <ProductCard products={bestSellerProducts}/>
        </ div>
    );
}

export default BestSellers;