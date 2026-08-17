import { useContext } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


const ProductCard = ({products})=>{
  const {getSingleProduct} = useContext(userContext);
  const navigate = useNavigate();
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mx-4">

       
        {products.map((item) => (
          <div
            key={item._id}
            onClick={()=>{
              console.log(typeof(item._id))
              getSingleProduct(item._id)
              navigate(`/product/${item._id}`)
            }}
            className="bg-white rounded-lg p-3 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 "
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-30 sm:h-56 object-cover rounded-md"
            />

            <div>
              <p className="text-base sm:text-lg font-bold text-green-700 mt-2 ">₹{item.price}</p>
              <h2 className="text-xs sm:text-base font-semibold line-clamp-2 ">{item.productName}</h2>
              <p className="text-xs sm:text-sm">
                {item.description?.length > 30
                  ? item.description.slice(0,30) + "..."
                  : item.description}
              </p>

             
              
            </div>
            
          </div>
        ))}
         </div>
        );}

export default ProductCard;