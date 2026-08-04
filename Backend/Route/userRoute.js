import e from "express";
import {loginUser,signupUser, updateUser, getUser} from "../Controller/userController.js";
import userAuthentication from "../middleware/userAuthentication.js";
const userRouter = e.Router();


userRouter.post("/login",loginUser);
userRouter.post("/signup",signupUser);
userRouter.put("/profile",userAuthentication,updateUser);
userRouter.get("/profile",userAuthentication,getUser);


export default userRouter;