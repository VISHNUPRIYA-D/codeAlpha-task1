import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const Orders = () => {
  const { orderData, getUserOrders, getSingleProduct } = useContext(userContext);
  const navigate = useNavigate();

  const deliveryFee = 70;

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="pt-20 px-5 md:px-10 pb-10">
      <h1 className="text-xl md:text-3xl font-bold mb-5 md:mb-10">Your Orders</h1>

      {orderData.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-base sm:text-lg">No Orders Yet</p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-8">
          {orderData.map((order) => {
            const deliveryDate = new Date(order.deliveryDate);
            const isDelivered = new Date() >= deliveryDate;

            return (
              <div
                key={order._id}
                className="bg-white shadow rounded-xl border px-2 md:p-5"
              >
                {/* Order Details */}

                {/* Products */}
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 md:gap-6 py-2 md:py-4"
                    onClick={()=>{getSingleProduct(item._id)
              navigate(`/product/${item._id}`)}}
                  >
                    {/* Left : Image + Details */}
                    <div className="flex gap-2 sm:gap-4 lg:w-[50%]">
                      <img
                        src={item.product.productImage}
                        alt={item.product.productName}
                        className="w-18 md:w-24 h-fit object-cover rounded-lg border flex-shrink-0"
                      />

                      <div className="w-full">
                        <h2 className="font-semibold text-xs md:text-base line-clamp-1">
                          {item.product.productName}
                        </h2>

                        <p className="text-[10px] md:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2 max-w-md">
                          {item.product.description}
                        </p>

                        <p className="mt-2 text-[10px] md:text-sm">
                          Quantity :
                          <span className="font-semibold ml-1 md:ml-2">
                            {item.quantity}
                          </span>
                        </p>

                        <p className="text-[10px] md:text-sm text-gray-500 mt-1">
                          {isDelivered
                            ? `Delivered on ${deliveryDate.toLocaleDateString()}`
                            : `Expected Delivery : ${deliveryDate.toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="lg:w-[22%] text-[10px] md:text-sm space-y-1 md:space-y-2">
                      <p>
                        Product Price :
                        <span className="font-semibold ml-1 md:ml-2">
                          ₹ {item.product.price}
                        </span>
                      </p>

                      <p>
                        Delivery :
                        <span className="font-semibold ml-1 md:ml-2">
                          ₹ {deliveryFee}
                        </span>
                      </p>

                      <p className="text-sm md:text-lg font-bold text-blue-900">
                        ₹ {item.product.price * item.quantity + deliveryFee}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="lg:w-[18%] lg:flex lg:justify-end">
                      <button
                        onClick={() => navigate(`/product/${item.product._id}`)}
                        className="bg-blue-950 text-sm md:text-base hover:bg-blue-900 text-white px-3 md:px-5 py-1 md:py-2 rounded-lg w-full lg:w-auto"
                      
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {orderData.length > 0 && (
        <div className="mt-10">
          <button
            onClick={() => navigate("/products")}
            className="text-blue-700 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
