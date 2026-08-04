import { useContext } from "react";
import { adminContext } from "../context/adminContext";

const AlertBox = () => {
  const { deleteAlert, setDeleteAlert, deleteProduct,deleteProductId,setDeleteProductId } = useContext(adminContext);

 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-xl shadow-xl p-6 w-96">

        <h2 className="text-xl font-semibold mb-3">
          Delete Product
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this product?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => {setDeleteAlert(false)
                setDeleteProductId(null);
            }}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={()=>deleteProduct()}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default AlertBox;