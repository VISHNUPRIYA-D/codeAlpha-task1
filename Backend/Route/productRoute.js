import { addProduct,removeProduct,getAllProducts,getOneProduct,updateProduct } from "../Controller/productController.js";
import e from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";
import userAuthentication from "../middleware/userAuthentication.js"
const productRouter = e.Router();

productRouter.get("/single/:id",getOneProduct);
productRouter.get("/",getAllProducts);

export default productRouter;