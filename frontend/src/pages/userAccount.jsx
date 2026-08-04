import { useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm"

const userAccount = () => {
  const { userData, setUserData, getUserData, updateUser, token, setEditUserData, editUserData, setEdit } =
    useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      console.log(userData);
    }
  }, []);

  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col items-center py-18 sm:py-25 px-4">
      {/* Orders & Cart Section */}
      <div className="w-full max-w-3xl  mb-8">
        <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-4">Your Account</h2>
        <div className="space-y-4">
          <div className="mt-10">
            <p className="text-gray-700 font-medium cursor-pointer" onClick={()=>navigate("/orders")}>Your Orders</p>
            <hr className="border-gray-600 mt-2" />
          </div>
          <div>
            <p className="text-gray-700 font-medium cursor-pointer" onClick={()=>navigate("/cart")}>Your Cart Items</p>
            <hr className="border-gray-600 mt-2" />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full max-w-3xl ">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {userData.phone ? userData.phone : "Please Add Your Phone Number"}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {userData.address ? userData.address : "Please Add Your Address"}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          {!userData.email ||
          !userData.name ||
          !userData.phone ||
          !userData.address ? (
            <button
              className="px-6 py-2 bg-blue-950 text-white rounded-lg shadow hover:bg-blue-800 transition"
            onClick={()=>{
              setEditUserData(true) 
              setEdit(false)
            }
            }
            >
              Add Details
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-blue-950 text-white rounded-lg shadow hover:bg-blue-800 transition"
              onClick={()=>{setEditUserData(true) 
                setEdit(true)
              }}
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
      {editUserData && <UserForm />}
    </div>
  );
};

export default userAccount;
