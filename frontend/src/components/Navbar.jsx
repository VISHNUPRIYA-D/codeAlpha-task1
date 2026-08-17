import { useContext, useState } from "react";
import logo from "../assets/shop&buyLogo.png";
import {FaSearch} from "react-icons/fa";
import {IoPerson } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown,IoIosHome } from "react-icons/io";
import Dropdown from "../components/Dropdown";


const Navbar = () => {
  const {search,setSearch,setShowCategory,showCategory,setShowBrands,showBrands} = useContext(userContext);
  const navigate = useNavigate();
  const [dropDown,setDropDown] = useState(false);
  {dropDown && setShowCategory(false)}
  return (
    <div className="fixed w-full h-10 z-100 sm:h-15 bg-[#d4de95] shadow-md shadow-[#b0b974]">
          <div className="flex max-w-full justify-between mx-2 md:mx-8 gap-2">
            <img src={logo} alt="logo" className="w-8 h-8 sm:w-15 sm:h-15 mt-1 " onClick={()=>navigate("/home")} />
            
            {/* Search  */}
            <div className="flex">
              <input
                type="text"
                className="border-b-amber-50 rounded-2xl text-xs sm:text-sm  bg-gray-100 pr-2 pl-6 sm:pl-10 my-3.5 sm:my-4 h-4 sm:h-5.5 w-32 md:w-56 lg:w-80 xl:w-xl"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={(e)=>{
                  if(e.key === "Enter"){
                  e.preventDefault();
                  navigate('/products');
                  }
                }}
              />
              <FaSearch className="fixed my-4 sm:my-5 text-xs md:text-base ml-1 sm:ml-2 text-blue-950" onClick={()=>{
                navigate('/products');
              }}/>
            </div>
            <div className=" flex w-2/6 sm:gap-5 my-2.5 md:my-4 text-xs sm:text-sm ">
            <div className="flex ">
              <p onClick={()=>{setShowCategory(!showCategory)
                
              }} className="cursor-pointer text-xs lg:text-base">Categories</p>
              <IoIosArrowDown className={`block md:hidden mx-4 my-1 cursor-pointer ${dropDown? "rotate-180" : "rotate-0"} `} onClick={()=>{
                setDropDown(!dropDown)
                setShowBrands(false)
                
              }}/>
            </div>
            

            

            {dropDown ? <Dropdown />:
            <div className="hidden md:flex gap-5 text-xs lg:text-base">

            <p onClick={()=>navigate("/bestSeller")} className="cursor-pointer" >BestSeller</p>
            <p onClick={()=>{setShowBrands(!showBrands) 
              console.log("brands")}} className="cursor-pointer">Brands</p>
            <p onClick={()=>navigate("/newArrivals")} className="cursor-pointer text-center">New Arrivals</p>
            </div>}
            
          </div>
    

        <div className=" flex gap-1.5 my-3.5 sm:gap-5 sm:my-5 hover:cursor-pointer text-xs sm:text-xl">
        <IoIosHome className="cursor-pointer" onClick={()=>navigate("/home")}/>
        <IoPerson onClick={()=>navigate("/profile")}/>
        <TiShoppingCart onClick={()=>navigate("/cart")}/>
        
      </div>
      
      </div>
      
      
    </div>
  );
};

export default Navbar;
