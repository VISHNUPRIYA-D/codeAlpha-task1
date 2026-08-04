import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    productImage: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    size: {
      type: [String],
      default: [],
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    }

   
  }, {timestamps:true}
);

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;