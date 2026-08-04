import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation"; 

const BuyAll = () => {
  const { userData, generateQR,qrCode,setQrCode,showFinishBtn,setShowFinishBtn, finishPayment } = useContext(userContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);


  return (
    <div className="pt-40 px-5 space-y-6 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        
        <p onClick={()=>navigate(-1)} className="absolute left-10 text-blue-600">Back</p>
      <h2 className="text-xl font-semibold text-gray-800">Confirm Details</h2>

      <div className="border p-4 rounded-md bg-gray-50">
        <p>{userData.phone || "Add Phone Number"}</p>
        <p>{userData.address || "Add Address"}</p>
        {(userData.phone && userData.address) ? (
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Details
          </button>
        ) : (
          <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Add Details
          </button>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
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
          onClick={() => setShowConfirmation(true)}
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
    onClick={()=>{finishPayment
      setQrCode(false)
      setShowFinishBtn(false)
    }
    }
    className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg"
  >
    Finish Payment
  </button>
)}


      {/* Show confirmation modal */}
      {showConfirmation && (
        <OrderConfirmation onClose={() => setShowConfirmation(false)} />
      )}
    </div>
  );
};

export default BuyAll;
