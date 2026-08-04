import { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { userContext } from "../context/userContext";
import HeroSlide from "../components/HeroSlide";
import Poster from "../components/Poster";
import logo from "../assets/shop&buyLogo.png"

import poster1 from "../assets/posters/poster1.jpeg"
import poster2 from "../assets/posters/poster2.jpeg"
import poster3 from "../assets/posters/poster3.jpeg";
import poster4 from "../assets/posters/poster4.jpeg";
import poster5 from "../assets/posters/poster5.jpeg";
import poster6 from "../assets/posters/poster6.jpeg";
import poster7 from "../assets/posters/poster7.jpeg";
const Home = () => {
  const { products, getAllProducts } = useContext(userContext);
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="pt-10 sm:pt-20">
  <HeroSlide />
  

  <section className="mt-12">
    <h2 className="text-3xl font-bold text-center">Featured Products</h2>
    <ProductCard products={products.slice(0, 8)} />
  </section>

 <section className="flex w-[95%] gap-4  my-12 px-10 ">
      <img
        src={poster1}
        alt="poster1"
        className="
           w-[25%]
        "
      />
      <img src={poster2} alt="poster2" className="w-[80%]"/>
    </section>

    <section className="mt-12">
    <h2 className="text-3xl font-bold text-center">Brands</h2>
    <ProductCard products={products.slice(8, 16)} />
  </section>

  <section className=" my-12 px-10 ">
      <img
        src={poster3}
        alt="poster3"
        className="  shadow-xl"
      />  
    </section>

     <section className="mt-12">
    <h2 className="text-3xl font-bold text-center">New Arrivals</h2>
    <ProductCard products={products.slice(16,)} />
  </section>

  <section className=" my-12 mx-10 overflow-hidden">
      <img
        src={poster5}
        alt="poster5"
        className="my-5"
      />  
      <div className="flex gap-4">
          <img
        src={poster4}
        alt="poster4"
        className="h-[450px]"
      />  
       <img
        src={poster6}
        alt="poster6"
        className="w-[40%] h-[450px]"
      />  
       <img
        src={poster7}
        alt="poster1"
        className="w-[40%] h-[450px]"
      />  
      </div>
       
    </section>

    <div className="flex gap-4 mx-3">
      <img src={logo} alt="Shop and Buy" className="w-20 h-20"/>
       <p className="text-gray-600 mt-6">
          Your destination for fashion, footwear, beauty and accessories.
        </p>

    </div>


     <footer className="bg-black text-white text-center py-5 mt-10">
      <h2 className="font-bold text-lg">
        Shop & Buy
      </h2>

      <p className="text-sm text-gray-400 mt-2">
        © 2026 Shop & Buy. All Rights Reserved.
      </p>
    </footer>

</div>
  );
};

export default Home;
