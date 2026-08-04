import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;
        

        const currentUser = await userModel.findOne({email});
        if(!currentUser){
            return res.json({success:false,message:"No user found"})
        }
        
        const isMatch = await bcrypt.compare(password,currentUser.password);
        if(!isMatch){
            return res.json({success:false,message:"password is not valid"});
        }else{
            const token = createToken(currentUser._id);
            return res.json({success:true,token,currentUser});
        }

    }catch(error){
        console.error(error.message);
    }
}

const signupUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const exitsUser = await userModel.findOne({email});
        if(!exitsUser){

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const newUser = new userModel({email,password:hashPassword});

            const user = await newUser.save();

            const token = createToken(user._id);
            return res.json({success:true,message:"Signed Up successfully",user});

        }else{
            res.json({success:false,message:"User already exits"});
        }
    }catch(error){
        console.log(error.message);
    }
}

const getUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {

    const { name, phone, address } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      {
        name,
        phone,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    return res.json({
      success: false,
      message: error.message,
    });

  }
};
export {loginUser,signupUser,updateUser,getUser
};