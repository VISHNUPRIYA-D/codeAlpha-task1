import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";

const Payment = () => {
  const {
    userData,
    buyNowProduct,
    setEditUserData,
    setEdit,
    generateQR,showFinishBtn, setShowFinishBtn,qrCode, setQrCode,finishPayment,paymentCod
  } = useContext(userContext);

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  


  const deliveryFee = 70;

  return (
    <div className="pt-20 px-5 space-y-6 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">

      <p
        onClick={() => navigate(-1)}
        className="absolute left-10 text-blue-600 cursor-pointer"
      >
        Back
      </p>

      <h2 className="text-xl font-semibold text-gray-800">
        Confirm Details
      </h2>

      {/* Address */}
      <div className="border p-4 rounded-md bg-gray-50">
        <p>{userData.phone || "Add Phone Number"}</p>

        <p>{userData.address || "Add Address"}</p>

        {userData.phone && userData.address ? (
          <button
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setEditUserData(true);
              setEdit(true);
            }}
          >
            Edit Details
          </button>
        ) : (
          <button
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => {
              setEditUserData(true);
              setEdit(false);
            }}
          >
            Add Details
          </button>
        )}
      </div>

      {/* Product Details */}

      {buyNowProduct && (
        <div className="border rounded-md bg-gray-50 p-4">
          <h2 className="text-xl font-semibold mb-4">
            Product Details
          </h2>

          <div className="space-y-2 text-sm">

            <p>
              <span className="font-semibold">Product :</span>{" "}
              {buyNowProduct.productName}
            </p>

            <p>
              <span className="font-semibold">Brand :</span>{" "}
              {buyNowProduct.brand}
            </p>

            <p>
              <span className="font-semibold">Category :</span>{" "}
              {buyNowProduct.category}
            </p>

            <p>
              <span className="font-semibold">Size :</span>{" "}
              {buyNowProduct.selectedSize}
            </p>

            <p>
              <span className="font-semibold">Quantity :</span>{" "}
              {buyNowProduct.quantity}
            </p>

            <hr />

            <p>
              Product Price :
              <span className="font-semibold ml-2">
                ₹ {buyNowProduct.price}
              </span>
            </p>

            <p>
              Delivery Fee :
              <span className="font-semibold ml-2">
                ₹ {deliveryFee}
              </span>
            </p>

            <p className="text-lg font-bold text-blue-900">
              Total : ₹ {buyNowProduct.price * buyNowProduct.quantity + deliveryFee}
            </p>

          </div>
        </div>
      )}

      {/* Payment */}

      <h2 className="text-xl font-semibold text-gray-800">
        Payment Method
      </h2>

      <div className="flex flex-col gap-3">

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={() => setPaymentMethod("cod")}
          />
          <span>Cash On Delivery</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="online"
            onChange={() => setPaymentMethod("online")}
          />
          <span>Online</span>
        </label>

      </div>

      {paymentMethod === "cod" && (
        <button
          onClick={() => {setShowConfirmation(true)
            paymentCod()
          }}
          className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Confirm Order
        </button>
      )}

      {paymentMethod === "online" && (
        <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700" onClick={generateQR}>
          Generate QR Code
        </button>
      )}
      {qrCode && (
  <div className="mt-6 text-center">
    <img
      src={qrCode}
      alt="QR Code"
      className="w-56 mx-auto border rounded-lg"
    />

    <p className="mt-3 text-gray-600">
      Scan this QR using any UPI app
    </p>
  </div>
)}
{showFinishBtn && (
  <button
    onClick={()=>{finishPayment()
      setQrCode(false)
      setShowFinishBtn(false)
    }
    }
    className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg"
  >
    Finish Payment
  </button>
)}

      {showConfirmation && (
        <OrderConfirmation onClose={() => setShowConfirmation(false)} />
      )}
    </div>
  );
};

export default Payment;