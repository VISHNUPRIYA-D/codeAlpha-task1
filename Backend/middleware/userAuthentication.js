import jwt from "jsonwebtoken";

const userAuthentication = async(req,res,next) =>{
    try{
        const authHead =req.headers.authorization;
        if(!authHead){
            return res.json({success:false,message:"No headers"});
        }
        const token = authHead.split(" ")[1];
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = verifyToken.id;
        next();
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export default userAuthentication;