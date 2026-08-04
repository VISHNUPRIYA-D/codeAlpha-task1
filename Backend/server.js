import express from "express";
import cors from "cors";
import connectDB from "./Config/mongoDB.js";
import dotenv from "dotenv";
import userRouter from "./Route/userRoute.js";
import productRouter from "./Route/productRoute.js";
import cartRouter from "./Route/cartRoute.js";
import orderRouter from "./Route/orderRoute.js";
import adminRouter from "./Route/adminRoute.js"
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

console.log(process.env.MONGODB_URL);
connectDB();
app.get("/",(req,res)=>{
    res.send("API is working");
})
app.use("/user",userRouter);
app.use("/products",productRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);
app.use("/admin",adminRouter);

app.listen(port,()=>console.log("Server is running on port "+port))