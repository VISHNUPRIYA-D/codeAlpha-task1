import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import {BiSolidLeftArrowAlt} from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { singleProductData, products, addToCart, buyNowProduct, buyNow } = useContext(userContext);
  const navigate = useNavigate();
  const [selectedSize,setSelectedSize] = useState("");
  const relatedProducts = products
  .filter(
    (product) =>
      product._id !== singleProductData._id &&
      product.category === singleProductData.category &&
      product.subCategory === singleProductData.subCategory
  );

  if (!singleProductData) {
    return (
      <div className="pt-24 text-center text-xl">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="pt-15 sm:pt-20 md:pt-24 pb-16 px-5 md:px-10 bg-gray-50 min-h-screen">

      <div className="">
        <BiSolidLeftArrowAlt onClick={()=>navigate(-1)} className="text-2xl mb-2 sm:absolute top-20 left-10"/>


        <div className="grid lg:grid-cols-2 gap-2 lg:gap-12">

          {/* Left Side */}
          <div className="flex justify-center">
            <img
              src={singleProductData.productImage}
              alt={singleProductData.productName}
              className="w-full max-w-md rounded-xl object-cover border"
            />
          </div>

          {/* Right Side */}
          <div>

            <h1 className="text-xl md:text-2xl font-bold">
              {singleProductData.productName}
            </h1>

            <p className="mt-3 text-gray-500">
              Brand :
              <span className="font-semibold ml-2 text-gray-700">
                {singleProductData.brand}
              </span>
            </p>

            <p className="mt-1 text-gray-500">
              Category :
              <span className="font-semibold ml-2 text-gray-700">
                {singleProductData.category}
              </span>
            </p>

            <div className="mt-3 md:mt-6">
              <h2 className="text-xl md:text-4xl font-bold text-blue-900">
                ₹ {singleProductData.price}
              </h2>

              <p className="text-sm text-green-600 mt-2">
                Inclusive of all taxes
              </p>
            </div>

            <div className="mt-4 md:mt-8">
              <h3 className="font-semibold text-xs md:text-lg mb-2">
                Description
              </h3>

              <p className="text-gray-600 leading-4 sm:leading-7 text-[10px] sm:text-base">
                {singleProductData.description}
              </p>
            </div>

            <div className="mt-4 md:mt-8">
              <h3 className="font-semibold text-sm md:text-lg mb-3">
                Available Sizes
              </h3>

              <div className="flex gap-3 flex-wrap">

                {(singleProductData.size || []).map((size) => (
                   <button
    key={size}
    onClick={() => setSelectedSize(size)}
    className={`border rounded-lg px-5 py-2 transition
      ${
        selectedSize === size
          ? "bg-blue-950 text-white"
          : "hover:bg-blue-950 hover:text-white"
      }`}
  >
    {size}
  </button>
                ))}

              </div>
            </div>

            <div className="mt-8">

              {singleProductData.inStock ? (
                <span className="text-green-600 font-semibold text-lg">
                   In Stock
                </span>
              ) : (
                <span className="text-red-600 font-semibold text-lg">
                  Out of Stock
                </span>
              )}

            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">

              <button 
              onClick={()=>addToCart(singleProductData._id)}
              className="bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition">
                Add to Cart
              </button>

              <button className="bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-400 transition"
              onClick={() => {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  buyNow({
    ...singleProductData,
    quantity: 1,
    selectedSize,
  });

  navigate("/payment");
}}>
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
      <div className="mt-16">
  <h2 className="text-2xl font-bold mb-6">
    Related Products
  </h2>
 <ProductCard products={relatedProducts} />
  
</div>

    </div>
  );
};

export default SingleProduct;
