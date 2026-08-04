import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import productModel from "../model/productModel.js";
import QRCode from "qrcode";

const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 5);

const orderCOD = async(req,res)=>{
    try{
        const userId = req.userId;
        const {items,amount,fromCart} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        const orderData = await orderModel.create({
            userId,
            name:user.name,
            address:user.address,
            items,
            amount,
            paymentMethod:"COD",
            paid:false,
            placedDate:Date.now(),
            deliveryDate:deliveryDate
        });
        if(fromCart){
        const cartData = user.cart;
        items.forEach((item)=>{
            delete cartData[item.productId];  
        });
  
        user.markModified("cart");
        await user.save();
        }

        return res.json({success:true,message:"ordered successfully",user});

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

const orderOnline = async(req,res)=>{
    try{
        const userId = req.userId;
        const {items,amount,fromCart} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }

        const orderData = await orderModel.create({
            userId,
            name:user.name,
            address:user.address,
            items,
            amount,
            paymentMethod:"Online",
            paid:true,
            placedDate:Date.now(),
            deliveryDate:deliveryDate
        });

        const cartData = user.cart;
        if(fromCart){
            items.forEach((item)=>{
                delete cartData[item.productId];
            });
        }
        user.markModified("cart");
        await user.save();

        return res.json({success:true,message:"paid successfully",user});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

const generateQR = async(req,res)=>{
    try{
        const {amount} = req.body;
        const upiString = `upi://pay?pa=demostore@upi&pn=DemoStore&am=${amount}&cu=INR`;

        const qrCode = await QRCode.toDataURL(upiString);
        return res.json({success:true,message:"success",qrCode});
    }catch(error){
        return res.json({success:false,message:error.message});
    }

}

const getAllOrders = async(req,res)=>{
    try{
        const orderData = await orderModel.find({});
        return res.json({success:true,message:"success",orderData});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });

    const orderData = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.items.map(async (item) => {
            const product = await productModel.findById(item.productId);

            return {
              ...item, // if item is a Mongoose subdocument
              product,
            };
          })
        );

        return {
          ...order.toObject(),
          items,
        };
      })
    );

    return res.json({
      success: true,
      orderData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export {orderCOD, orderOnline, generateQR, getAllOrders, getUserOrders};