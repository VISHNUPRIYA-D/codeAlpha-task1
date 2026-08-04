import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartData, setCartData,getSingleProduct, deleteCart } = useContext(userContext);
  const navigate = useNavigate();

const productTotal = cartData.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

const deliveryFee = cartData.length > 0 ? 70 : 0;

const total = productTotal + deliveryFee;
  return (
    <div className="pt-20 mx-5 md:mx-10 w-full md:w-[90%] relative ">
      <h1 className="text-2xl mb-10">
        <b>Your Cart Items</b>
      </h1>
      <div className=" lg:mx-20">
        {cartData.map((item, index) => (
          <div className="border-b border-gray-500 py-4" key={index}>
            <div className="flex gap-3 md:justify-between items-center">
              {/* Left side: product image + name */}
             <div className="space-y-1 w-[150px] md:w-auto" onClick={()=>{getSingleProduct(item._id)
              navigate(`/product/${item._id}`)}}>
                 <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-14 md:w-18 lg:w-24 h-fit"
                />
                <p className="text-[10px] sm:text-sm md:text-auto ">{item.productName}</p>
             </div>
               
              

              {/* Middle: quantity */}
              <div>
                
              </div>
              <div className="space-y-2 text-[10px] sm:text-sm md:text-auto">
                <p>Quantity</p>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => {
                    const qty = Number(e.target.value);
                    cartData.map((cartItem)=>(
                      cartItem._id === item._id ? {...cartItem,quantity:qty} : cartItem
                    ));
                  }}
                  className="border w-10 sm:w-16 px-1 appearance-auto"
                />
              </div>

              {/* Middle: price */}
              <div className="space-y-2 text-[10px] sm:text-sm md:text-auto">
                <p>
                  Product Price: <strong>₹ {item.price * item.quantity}</strong>
                </p>
                <p>
                  Delivery Fees: <strong>₹ {deliveryFee}</strong>
                </p>
              </div>

              {/* Right side: buttons */}
              <div className="block space-y-2 sm:flex space-x-2 text-[10px] sm:text-sm md:text-auto">
                <button className="bg-blue-950 text-white px-1 sm:px-3 py-1 rounded"  onClick={()=> navigate(`/product/${item._id}`)}>
                  Buy Now
                </button>
                <button className="bg-red-500 text-white px-1 sm:px-3 py-1 rounded" onClick={()=>deleteCart(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute right-2 sm:right-[15%] mt-2 md:mt-10 text-sm md:text-xl">
            <div className="flex gap-10 ">
              <p className="mt-1 sm:mt-2">Total Price : <strong>₹ {total}</strong></p>
           
         <button className=" bg-amber-500 cursor-pointer px-2 py-1 sm:px-5 shadow-md shadow-amber-800 sm:py-2 rounded sm:rounded-xl" onClick={()=>navigate("/buyallcart")}>Proceed </button>

        </div>
        
        </div>
        <p className="text-blue-500 text-xs md:text-md mt-10 cursor-pointer hover:underline" onClick={()=>navigate("/products")}> Continue Shopping</p>
        
      </div>
     
    </div>
  );
};

export default Cart;
