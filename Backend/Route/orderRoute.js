import e from "express";
import { generateQR, getAllOrders, orderCOD, orderOnline, getUserOrders } from "../Controller/orderController.js";
import userAuthentication from "../middleware/userAuthentication.js";

const orderRoute = e.Router();

orderRoute.post("/payment/cod",userAuthentication,orderCOD);
orderRoute.post("/payment/online",userAuthentication,orderOnline);
orderRoute.post("/pay/online/qr",userAuthentication,generateQR);
orderRoute.get("/user-orders",userAuthentication,getUserOrders);

export default orderRoute;