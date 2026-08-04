import { useContext, useEffect } from "react";
import { adminContext } from "../context/adminContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import AlertBox from "../componets/AlertBox";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const {
    products,
    getProducts,
    deleteAlert,
    setDeleteAlert,
    setDeleteProductId,
    setEditMode,
    setEditProductId,
    editMode,
    setData,
    setImage,
    searchProduct
  } = useContext(adminContext);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="pt-32 px-6">
      <h1 className="text-2xl font-bold mb-5">Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-4">
        {searchProduct.map((item) => (
          <div
            key={item._id}
            className="relative border border-gray-300 rounded-lg p-4 mb-4 shadow-xl   text-[10px] sm:text-xs "
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-24 h-24 object-cover"
            />
            <p>₹{item.price}</p>

            <div>
              <h2 className="font-semibold">{item.productName}</h2>
              <p className="hidden sm:block sm:text-xs">
                {item.description?.length > 100
                  ? item.description.slice(0, 100) + "..."
                  : item.description}
              </p>

              <p className="sm:hidden">
                {item.description?.length > 100
                  ? item.description.slice(0, 50) + "..."
                  : item.description}
              </p>
              <p>{item.category}</p>
            </div>
            <div className="absolute top-3 right-3 flex gap-3 cursor-pointer">
              <FaEdit
                onClick={() => {
                    console.log(item.size);
                  setData({
                    productName: item.productName,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    subCategory: item.subCategory,
                    brand: item.brand,
                    color: item.color,
                    size: Array.isArray(item.size)
  ? item.size.flatMap((s) => s.split(","))
  : item.size.split(","),
                    inStock: item.inStock,
                    bestSeller: item.bestSeller,
                  });

                  setImage(item.productImage);
                  setEditMode(!editMode);
                  setEditProductId(item._id);
                  navigate("/home");
                }}
              />
              <FaTrash
                onClick={() => {
                  setDeleteAlert(!deleteAlert);
                  setDeleteProductId(item._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {deleteAlert ? <AlertBox /> : ""}
    </div>
  );
};

export default Products;
