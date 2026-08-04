import e from "express";
import { adminLogin } from "../Controller/adminController.js";
import { getAllProducts,removeProduct,updateProduct,addProduct, getOneProduct } from "../Controller/productController.js";
import adminAuthentication from '../middleware/adminAuthentication.js';
import { getAllOrders } from "../Controller/orderController.js";
import upload from "../middleware/multer.js"

const adminRouter = e.Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/",adminAuthentication,getAllProducts);
adminRouter.get("/orders",adminAuthentication,getAllOrders);
adminRouter.delete("/remove/:id",adminAuthentication,removeProduct);
adminRouter.put("/update/:id",adminAuthentication,upload.single("image"),updateProduct);
adminRouter.post("/add",adminAuthentication,upload.single("image"),addProduct);
adminRouter.get("/single/:id",adminAuthentication,getOneProduct);



export default adminRouter;