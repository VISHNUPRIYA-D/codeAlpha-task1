import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { userData, setUserData, updateUser, setEditUserData,edit,setEdit } =
    useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateUser();

    if (success) {
      setEditUserData(false);
      setEdit(false);
    } 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

      <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6" >
          {edit ?" Update Profile" : "Add Profile"}
        </h1>


        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>

            <textarea
              name="address"
              value={userData.address || ""}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div className="flex gap-3 pt-3">

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {edit? "Update" : "Add"}
            </button>


            <button
              type="button"
              onClick={() => {setEditUserData(false) 
                setEdit(false);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>

          </div>

        </form>


        

      </div>

    </div>
  );
};

export default UserForm;