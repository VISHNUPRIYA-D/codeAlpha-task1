import productModel from "../model/productModel.js";
import streamifier from "streamifier";
import cloudinary from "../Config/cloudinary.js";
import { json } from "express";

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const addProduct = async(req,res)=>{
    try{
        const {productName,price,category,subCategory,brand,color,size,inStock,description,bestSeller} = req.body;
        const parsedSize = JSON.parse(size);
        const result = await uploadImage(req.file.buffer);
        const newProduct =new productModel({
            productName,price,category,subCategory,productImage:result.secure_url,brand,color,size:parsedSize,inStock,description,bestSeller
        });

        console.log(req.body);
        console.log(req.file);

        const product = await newProduct.save();
        res.json({success:true,message:"product added successfully",product});
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

const removeProduct = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.id);
        res.json({success:true,message:"Deleted Successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

const getAllProducts = async(req,res) =>{
    try{
        const products = await productModel.find({});
        res.json({success:true,products});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

const getOneProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await productModel.findById(id);
        if(!product){
           return res.json({success:false,message:"product not found"});
        }
        res.json({success:true,message:"success",product});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };
    console.log(updateData);

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updateData.productImage = result.secure_url;
      console.log(req.file);
    }
    if(updateData.size){
    updateData.size = JSON.parse(updateData.size);
}

    const product = await productModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export {addProduct,removeProduct,getAllProducts,getOneProduct,updateProduct}; 