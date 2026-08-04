import { createContext, useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();


const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token,setToken] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showBrands, setShowBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name:"",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("user")) ||{
    email:"",
    name:"",
    phone:"",
    address:""
  })
  const[editUserData,setEditUserData] = useState(false);
  const [edit,setEdit] = useState(false);
  const [cartData,setCartData] = useState([]);
  const [orderData,setOrderData] = useState([]);
  const [singleProductData,setSingleProductData] = useState([]);
  const [buyNowProduct,setBuyNowProduct] = useState([]);
  const [showFinishBtn, setShowFinishBtn] = useState(false);
  const [qrCode, setQrCode] = useState("");
  
  useEffect(()=>{
    getSingleProduct()
    getCartItems()
    
  },[userData]);


  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/user/login", loginData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      
        setUserData(res.data.currentUser);
        

        // Optional
        localStorage.setItem("user", JSON.stringify(res.data.currentUser));

        return true;
      } else {
        setError(res.data.message);
        return false;
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/user/signup", signupData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        
        setUserData(res.data.user);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        return true;
      } else {
        setError(res.data.message);
        return false;
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      setUserData(res.data.user);
    } else {
      setError(res.data.message);
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
 
  const updateUser = async() =>{
    try{
      
      const res= await api.put("/user/profile",userData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("server response :" ,res.data)
      if(res.data.success){
        
        setUserData(res.data.user);

        localStorage.setItem("user", JSON.stringify(res.data.user));
        return true;
      }
    }catch(error){
      console.log("Update error:",error.message);
      
    }
  }

  const getAllProducts = async () => {
    try {
      const res = await api.get("/products");
      if (res.data.success) {
        setProducts(res.data.products);
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const bestSellerProducts = products.filter((product) => product.bestSeller);
  const newArrivals = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const filteredProducts = products.filter((product) => {
    const value = search.toLowerCase();

    const matchesSearch =
      product.productName.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      product.subCategory.toLowerCase().includes(value) ||
      product.brand.toLowerCase().includes(value) ||
      product.color.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value);

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesSubCategory =
      !selectedSubCategory || product.subCategory === selectedSubCategory;

    const matchesBrand = !selectedBrand || product.brand === selectedBrand;

    return (
      matchesSearch && matchesCategory && matchesSubCategory && matchesBrand
    );
  });

  const getCartItems = async() =>{
    try{
      const res = await api.get("/cart",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(res.data.success){
        setCartData(res.data.cartProducts);
        
      }
    }catch(error){

    }
  }

  const getUserOrders = async () => {
  try {
    const res = await api.get("/order/user-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      setOrderData(res.data.orderData);
      console.log(res.data.orderData);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getSingleProduct = async(productId)=>{
  try{
      const res = await api.get(`/products/single/${productId}`);
      console.log(res.data)
      if(res.data.success){
        console.log(res.data.product);
        setSingleProductData(res.data.product);
      }
  }catch(error){
    console.log(error.message);
  }
  console.log(singleProductData);
}

const addToCart = async(productId)=>{
   try{
      const res = await api.post('/cart/addcart',{productId},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(res.data)
      if(res.data.success){
        console.log(res.data.cartData);
        await getCartItems();
      }
  }catch(error){
    console.log(error.message);
  }
}

const deleteCart = async(productId)=>{
  try{
    const res = await api.delete('/cart/deletecart',{
        data:{
          productId
        },
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(res.data);
    if(res.data.success){
      await getCartItems();
      console.log("deleted")
    }

  }catch(error){
    console.log(error.message);
  }
}

const buyNow = (product) => {
  setBuyNowProduct(product);
  navigate("/payment");
};
const deliveryFee = 70; 
const generateQR = async () => {
  try {
    const res = await api.post(
      "/order/pay/online/qr",
      {
        amount:
          buyNowProduct.price * buyNowProduct.quantity + deliveryFee,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      setQrCode(res.data.qrCode);

      setTimeout(() => {
        setShowFinishBtn(true);
      }, 5000);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const finishPayment = async () => {
  try {

    const orderData = {
      items: [
        {
          productId: buyNowProduct._id,
          quantity: buyNowProduct.quantity,
          size: buyNowProduct.selectedSize,
        },
      ],

      amount:
        buyNowProduct.price * buyNowProduct.quantity + 70,

      fromCart: false,
    };


    const res = await api.post(
      "/order/payment/online",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    if(res.data.success){
      alert("Payment successful");
      navigate("/home");
      return true;
    }
    else{
      alert(res.data.message);
      return false;
    }


  } catch(error){
    console.log(error.message);
    return false;
  }
};
const paymentCod = async () => {
  try {
    const orderData = {
      items: [
        {
          productId: buyNowProduct._id,
          quantity: buyNowProduct.quantity,
          size: buyNowProduct.selectedSize,
        },
      ],
      amount: buyNowProduct.price * buyNowProduct.quantity + 70,
      fromCart: false,
    };
    console.log(buyNowProduct);

    const res = await api.post(
      "/order/payment/cod",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      alert("Order placed successfully");
      navigate("/home");
     
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

  const values = {
    products,
    token,
    setProducts,
    search,
    setSearch,
    filteredProducts,
    getAllProducts,
    showCategory,
    setShowCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    showBrands,
    setShowBrands,
    selectedBrand,
    setSelectedBrand,
    bestSellerProducts,
    newArrivals,
    handleLoginSubmit,
    loginData,
    setLoginData,
    showPassword,
    setShowPassword,
    loading,
    setLoading,
    error,
    setError,
    signupData,
    setSignupData,
    handleSignupSubmit,
    userData,setUserData,
    updateUser,
    getUserData,
    editUserData,
    setEditUserData,
    edit,
    setEdit,
    cartData,setCartData,
    getUserOrders,
    orderData,setOrderData,
    singleProductData,setSingleProductData,
    getSingleProduct,
    addToCart,deleteCart,
    buyNowProduct,setBuyNowProduct,buyNow,
    generateQR,
    finishPayment,
    showFinishBtn, setShowFinishBtn,
    qrCode, setQrCode,
    paymentCod
    
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export default UserContextProvider;
