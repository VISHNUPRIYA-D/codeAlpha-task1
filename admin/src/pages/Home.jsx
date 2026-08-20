import { useContext, useEffect } from "react";
import api from "../services/api";
import Navbar from "../componets/Navbar";
import { adminContext } from "../context/adminContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { handleChange, handleSubmit, image, setImage, data, setData,editMode,setEditMode,getSingleProduct } =
    useContext(adminContext);
    let navigate = useNavigate();
  const subCategories = {
  Men : ["Shirts","Pants","Trousers","T-Shirt","Sweater","Hoodie","Jacket","Jean","Vesti","Pajama"],
  Women : ["Saree","Kurthi","T-Shirt","Shirts","Pants","Shorts","Sweater","Hoodie","Night suit","Pajama","Jacket","Jean","Crop Top","Frog","Long Top"],
  Kids:["T-Shirts", "Shirts", "Jeans", "Pajama", "Sweater", "Hoodies", "Jackets","Dress"],
  Footwears:["Sandles","Formal Shoe","Casual Shoe"],
  Accessories:["Chains","Watch","Earring","Ring","Braclet","Necklesh"]
  }

  return (
    <div className="text-xs sm:text-[15px]">
  <div className="max-w-3xl mx-auto p-4 sm:p-8 pt-15 sm:pt-20 bg-white rounded-lg shadow">
    <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8">{editMode? "Edit Product" : "Add Product"}</h1>

    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-5">

      {/* Product Image */}
      <div>
        <label className="font-medium">Product Image</label>
        {editMode && typeof image === "string" && (
    <img
      src={image}
      alt="Current Product"
      className="w-12 sm:w-32 h-12 sm:h-32 object-cover rounded mb-1 sm:mb-3"
    />
  )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
          required
        />
      </div>

      {/* Product Name */}
      <div>
        <label className="font-medium">Product Name</label>

        <input
          type="text"
          name="productName"
          value={data.productName}
          onChange={handleChange}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-medium">Description</label>

        <textarea
          rows="4"
          name="description"
          value={data.description}
          onChange={handleChange}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="font-medium">Price</label>

        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="font-medium">Category</label>

        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Shoes">Footwears</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Sub Category */}
      <div>
        <label className="font-medium">Sub Category</label>

        <select
          name="subCategory"
          value={data.subCategory}
          onChange={handleChange}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
          required
        >
          <option value="">Select Sub Category</option>
          {(subCategories[data.category] || []).map((subCategory)=>(
          <option value={subCategory} >{subCategory}</option>  
        ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="font-medium">Brand</label>

        <input
          type="text"
          name="brand"
          value={data.brand}
          onChange={handleChange}
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
        />
      </div>

      {/* Color */}
      <div>
        <label className="font-medium">Color</label>

        <input
          type="text"
          name="color"
          value={data.color}
          onChange={handleChange}
          placeholder="Black"
          className="w-full border rounded p-1 sm:p-2 mt-1 sm:mt-2"
        />
      </div>

      {/* Sizes */}
      <div>
        <label className="font-medium block mb-1 sm:mb-2">Available Sizes</label>

        <div className="flex flex-wrap gap-2 sm:gap-4">

          {["XS","S","M","L","XL","XXL"].map((size) => (

            <label key={size} className="flex items-center gap-2">

              <input
                type="checkbox"
                value={size}
                checked={data.size.includes(size)}
                onChange={(e) => {

                  if (e.target.checked) {
                    setData({
                      ...data,
                      size: [...data.size, size],
                    });
                  } else {
                    setData({
                      ...data,
                      size: data.size.filter((item) => item !== size),
                    });
                  }

                }}
              />

              {size}

            </label>

          ))}

        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="inStock"
          checked={data.inStock}
          onChange={handleChange}
        />

        <label>In Stock</label>

      </div>

      {/* Best Seller */}
      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="bestSeller"
          checked={data.bestSeller}
          onChange={handleChange}
        />

        <label>Best Seller</label>

      </div>

          <div className="flex gap-2 sm:gap-5 text-xs sm:text-xl">
      <button
        type="submit"
        className="bg-blue-950 text-white px-3 py-1 sm:px-8 sm:py-3 rounded hover:bg-blue-800"
        
      >
       {editMode? "Update Product" : "Add Product" } 
      </button>
      {editMode && <button
        className="bg-white border border-gray-300 px-3 py-1 sm:px-8 sm:py-3 rounded hover:bg-gray-300"
        onClick={()=>{setEditMode(false)
          navigate("/products");
          setData({productName: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        brand: "",
        color: "",
        size: [],
        inStock: true,
        bestSeller: false});
        setImage(null);
        }}
      >
       Cancel
      </button>
      }
      </div>
      

    </form>
  </div>
</div>
  );
};

export default Home;
