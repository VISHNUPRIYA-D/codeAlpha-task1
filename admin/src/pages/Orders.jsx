import { useContext, useEffect } from "react";
import { adminContext } from "../context/adminContext";

const Orders = () => {
  const { orders, getAllOrders, products,getProducts } = useContext(adminContext);

  useEffect(() => {
    getProducts();
    getAllOrders();
  }, []);

  return (
    <div className="pt-18 sm:pt-24 px-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Orders</h1>
      <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-4">
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg shadow-md p-2 sm:p-5 mb-2 sm:mb-5 text-[10px] md:text-[15px]">
          <p>
            <strong>Customer:</strong> {order.name}
          </p>

          <p>
            <strong>Address:</strong>{order.address}
          </p>

          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Paid:</strong> {order.paid ? "Yes" : "No"}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Placed On:</strong>{" "}
            {new Date(order.placedDate).toLocaleDateString()}
          </p>

          <p>
            <strong>Delivery Date:</strong>{" "}
            {new Date(order.deliveryDate).toLocaleDateString()}
          </p>

          <div className="mt-2 sm:mt-4">
            <strong>Items:</strong>

           
            {order.items.map((item, index) => {
              console.log("Searching for:", item.productId);

  const product = products.find((p) => {
    console.log("Comparing:", p._id, item.productId);
    return String(p._id) === String(item.productId);
  });
 console.log("Found:"+product);
              
            return(
              <div key={index} className="ml-2 sm:ml-4 mt-1 sm:mt-2 ">
                <img
                  src={product?.productImage}
                  alt={product?.productName}
                  className="w-16 h-16"
                />

                <p>{product?.productName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>₹{product?.price}</p>
              </div>);
            })}
            </div>
          </div>
        
      ))}
      </div>
    </div>
  );
};

export default Orders;
