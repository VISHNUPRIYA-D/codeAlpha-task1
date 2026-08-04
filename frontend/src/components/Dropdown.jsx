import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const DropDown = () =>{
   const {setShowBrands,showBrands} = useContext(userContext);
   const navigate = useNavigate();
   return( 
   <div className="md:hidden bg-white fixed top-10 sm:left-1/2 sm:translate-x-20 p-5 leading-8 right-0 ">
         <p onClick={()=>navigate("/bestSeller")} className="cursor-pointer" >BestSeller</p>
            <p onClick={()=>{setShowBrands(!showBrands) 
              console.log("brands")}} className="cursor-pointer">Brands</p>
            <p onClick={()=>navigate("/newArrivals")} className="cursor-pointer">New Arrivals</p>
         
    </div>
   );
}
export default DropDown;