import { useContext } from "react"
import { userContext } from "../context/userContext"
import { useNavigate } from "react-router-dom";

const Brands = () =>{
    const {products,showBrands,setSelectedBrand,setShowBrands} = useContext(userContext);
    const navigate = useNavigate();
    return(
        <>
        {showBrands && <div className="bg-white text-xs sm:text-sm fixed z-50 top-10 sm:left-1/2 sm:translate-x-1/2 p-5 leading-7 right-30">
             {products.map((product)=>(
            <p key={product._id} onClick={()=>{setSelectedBrand(product.brand)
                setShowBrands(!showBrands)
                navigate("/products")
            }} className="cursor-pointer">{product.brand}</p>
        ))}

        </div>}
        </>
        
       
    )
}
export default Brands;