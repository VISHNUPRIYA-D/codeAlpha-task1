import { useContext } from "react";
import logo from "../assets/shop&buyLogo.png";
import {FaSearch} from "react-icons/fa";
import {IoPerson } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../context/adminContext";


const Navbar = () => {
  const {search,setSearch,searchProduct} = useContext(adminContext);
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 w-full h-10  sm:h-15 bg-[#d4de95] shadow-xl shadow-[#b0b974]">
      <div className="flex max-w-full justify-between mx-3 md:mx-8 ">
        <img src={logo} alt="logo" className="w-8 h-8 sm:w-15 sm:h-15 mt-1 " />
        
        {/* Search  */}
        <div className="flex">
          <input
            type="text"
            className="border-b-amber-50 rounded-2xl text-[12px] sm:text-xs  bg-white pr-2 pl-6 sm:pl-10 my-3 sm:my-3.5 h-4 sm:h-7 w-72 md:w-96 xl:w-2xl"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
              e.preventDefault();
              navigate('/search');
              }
            }}
          />
          <FaSearch className="fixed my-3.5 sm:my-5 text-xs md:text-xl ml-2 text-blue-950" onClick={()=>{
            navigate('/search');
          }}/>
        </div>

        <div className="flex gap-1 sm:gap-3 my-3.5 cursor-pointer text-[10px] sm:text-[15px]">
          <p onClick={()=>navigate("/home")}>Add</p>
          <p onClick={()=>navigate("/products")}>Products</p>
          <p onClick={()=>navigate("/orders")}>Orders</p>
        </div>
        
      </div>
      
    </div>
  );
};

export default Navbar;
