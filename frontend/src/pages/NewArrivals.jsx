import { useContext } from "react"
import { userContext } from "../context/userContext"
import ProductCard from "../components/ProductCard";
const NewArrivals = () =>{
    const {newArrivals} = useContext(userContext);

    return(
        <div className="pt-20 mx-4">
            <ProductCard products={newArrivals}/>

        </div>
    )
}

export default NewArrivals