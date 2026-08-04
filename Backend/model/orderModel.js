import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    items:{
        type:Array,
        required:true
    },

    paid:{
        type:Boolean,
        default:false
    },

    paymentMethod:{
        type:String,
        required:true
    },

    placedDate:{
        type:Date,
        default:Date.now
    },

    deliveryDate:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        default:"Order placed"
    },

    amount:{
        type:Number,
        required:true
    }

});

const orderModel = mongoose.models.orders || mongoose.model("orders",orderSchema); export default orderModel;