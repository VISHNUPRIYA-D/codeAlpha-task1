import { createContext, use, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const adminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [products,setProducts] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [token,setToken] = useState(null);
    const [deleteAlert,setDeleteAlert] = useState(false);
    const [deleteProductId,setDeleteProductId] = useState(null);
    const [orders,setOrders] = useState([]);
    const [editMode,setEditMode] = useState(false);
    const [editProductId,setEditProductId] = useState(null);
    const [search,setSearch] = useState("");

    useEffect(()=>{
        getProducts();
        getAllOrders();
    },[])

    const getProducts = async() =>{
        try{
            const token = localStorage.getItem("token");
            const res = await api.get("/",{headers:{
                Authorization:`Barear ${token}`
            }});
            if(res.data.success){
                setProducts(res.data.products);
            }
        }catch(error){
            console.log(error.message);
        }
    }

    const [data, setData] = useState({
        productName: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        brand: "",
        color: "",
        size: [],
        inStock: true,
        bestSeller: false,
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const formData = new FormData();

        if (image instanceof File) {
    formData.append("image", image);
}

        Object.keys(data).forEach((key) => {
  if (key === "size") {
    formData.append("size", JSON.stringify(data.size));
  } else {
    formData.append(key, data[key]);
  }
});

        const token = localStorage.getItem("token");

        if(editMode){
            const res = await api.put(`/update/${editProductId}`,formData,{headers:{
                Authorization:`Bearer ${token}`
            }
        });
         if (res.data.success) {
            alert("Product updated Successfully");
            setData( {productName: "",
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
        navigate("/products");
        } else {
            alert(res.data.message);
        }
        }else{
        const res = await api.post("/add", formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.success) {
            alert("Product Added Successfully");
        } else {
            alert(res.data.message);
        }
    }

    } catch (error) {
        console.log(error);
    }
};


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

  

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const res = await api.post("/login", loginData);

            if (res.data.success) {

                localStorage.setItem("token", res.data.token);
                console.log(res.data.token);
                setToken(res.data.token);

                return true;

            } else {

                setError(res.data.message);
            
                return false;

            }

        } catch (error) {

            setError(error.response?.data?.message || "Something went wrong");

        } finally {

            setLoading(false);

        }
    };

    const deleteProduct = async() =>{
        try{
            const token = localStorage.getItem("token");
            const res = await api.delete(`/remove/${deleteProductId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
             if (res.data.success) {
      setProducts((prev) =>
        prev.filter((item) => item._id !== deleteProductId)
      );
      setDeleteAlert(false);
      setDeleteProductId(null);}
        }catch(error){
            console.error(error.message);
        }
    }

    const getAllOrders = async() =>{
        try{
            const token = localStorage.getItem("token");
            const res = await api.get("/orders",{headers:{
                Authorization:`Bearer ${token}`
            }})
            if(res.data.success){
                setOrders(res.data.orderData);
            }
        }catch(error){
            console.error(error.message);
        }
    }

    const getSingleProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(`/single/${editProductId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      const product = res.data.product;

      setData({
        productName: product.productName,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        brand: product.brand,
        color: product.color,
        size: product.size,
        inStock: product.inStock,
        bestSeller: product.bestSeller,
      });

      setEditProductId(product._id);
      setEditMode(true);
    }
  } catch (error) {
    console.log(error);
  }
};

const searchProduct = products.filter((product)=>{
        console.log(product);
        console.log(product.subCategory);
        const value = search.toLowerCase();

        return(
            product.productName.toLowerCase().includes(value) ||
            product.category.toLowerCase().includes(value) || 
            product.subCategory.toLowerCase().includes(value) ||
            product.description.toLowerCase().includes(value) ||
            product.color.toLowerCase().includes(value) ||
            product.brand.toLowerCase().includes(value)
        );
    });
   


    return (
        <adminContext.Provider
            value={{
                image,
                setImage,
                data,
                setData,
                handleChange,
                handleSubmit,
                products,setProducts,
                getProducts,
                loginData,setLoading,
                handleLoginChange,
                handleLoginSubmit,
                showPassword,setShowPassword,
                loading,setLoading,
                error,setError,
                deleteAlert,setDeleteAlert,
                deleteProductId,setDeleteProductId,
                deleteProduct,
                getAllOrders,orders,setOrders,
                editMode,setEditMode,
                editProductId,setEditProductId,
                getSingleProduct,
                search,setSearch,
                searchProduct
            }}
        >
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;