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
          <div className="flex max-w-full justify-between mx-3 md:mx-8 gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 sm:w-15 sm:h-15 mt-1 " onClick={()=>navigate("/home")} />
            
            {/* Search  */}
            <div className="flex">
              <input
                type="text"
                className="border-b-amber-50 rounded-2xl text-[12px] sm:text-xs  bg-white pr-2 pl-6 sm:pl-10 my-3 sm:my-3.5 h-5 sm:h-7 w-32 md:w-96 xl:w-2xl"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={(e)=>{
                  if(e.key === "Enter"){
                  e.preventDefault();
                  navigate('/products');
                  }
                }}
              />
              <FaSearch className="fixed my-4 sm:my-5 text-xs md:text-xl ml-2 text-blue-950" onClick={()=>{
                navigate('/products');
              }}/>
            </div>
            <div className=" flex w-2/6 sm:gap-5 my-2.5 md:my-4 text-xs sm:text-sm ">
            <div className="flex ">
              <p onClick={()=>{setShowCategory(!showCategory)
                
              }} className="cursor-pointer">Categories</p>
              <IoIosArrowDown className={`block md:hidden my-1.5 cursor-pointer ${dropDown? "rotate-180" : "rotate-0"} `} onClick={()=>{
                setDropDown(!dropDown)
                setShowBrands(false)
                
              }}/>
            </div>
            

            

            {dropDown ? <Dropdown />:
            <div className="hidden md:flex gap-5">

            <p onClick={()=>navigate("/bestSeller")} className="cursor-pointer" >BestSeller</p>
            <p onClick={()=>{setShowBrands(!showBrands) 
              console.log("brands")}} className="cursor-pointer">Brands</p>
            <p onClick={()=>navigate("/newArrivals")} className="cursor-pointer">New Arrivals</p>
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
