
import { addCart,deleteCart,getCart } from "../Controller/cartController.js";
import e from"express";
import userAuthentication from "../middleware/userAuthentication.js";

const cartRouter = e.Router();

cartRouter.post("/addcart",userAuthentication,addCart);
cartRouter.delete("/deletecart",userAuthentication,deleteCart);

cartRouter.get("/",userAuthentication,getCart);

export default cartRouter;