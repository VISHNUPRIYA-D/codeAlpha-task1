import jwt from "jsonwebtoken";

const adminLogin = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(email !== process.env.ADMIN_MAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Invalid email or password"});
        }

        const token = jwt.sign({email,role:"admin"},process.env.JWT_SECRET_KEY);

        return res.json({success:true,message:"Authorized successfully",token});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export {adminLogin};