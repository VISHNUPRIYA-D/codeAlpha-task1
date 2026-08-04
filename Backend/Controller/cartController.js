import userModel from "../model/userModel.js";
import productModel from "../model/productModel.js"

const addCart = async(req,res)=>{
    try{
        const userId = req.userId;
        const {productId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        const cartData = user.cart;
        
        if(cartData[productId]){
            cartData[productId]+=1;
        }else{
            cartData[productId]=1;
        }
        user.markModified("cart");
        await user.save();

        return res.json({success:true,message:"success",cartData});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

const deleteCart = async(req,res)=>{
    try{
        const userId = req.userId;
        const{productId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){return res.json({success:false,message:"user not found"})}
        const cartData = user.cart;
        if(cartData[productId]>1){
            cartData[productId]-=1;
        }else{
            delete cartData[productId];
        }
        user.markModified("cart");
        await user.save();
        console.log(cartData[productId]);
        return res.json({success:true,message:"delete",cartData});
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}



const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const cart = user.cart;

    const productIds = Object.keys(cart);

    const products = await productModel.find({
      _id: { $in: productIds },
    });

    const cartProducts = products.map((product) => ({
      ...product.toObject(),       
      quantity: cart[product._id.toString()],
    }));

    return res.json({
      success: true,
      cartProducts,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export {addCart,deleteCart,getCart};