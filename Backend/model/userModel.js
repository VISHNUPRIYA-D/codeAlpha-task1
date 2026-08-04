import mongoose from"mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,
        required:true,
        match:[/^\S+@\S+\.\S+$/,"Please enter valid email"],
        unique:true
    },
    phone:{type:String,
        match:[/^[6-9]\d{9}$/,"Please enter valid phone number"]
    },
    password:{type:String,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$])(?=.*\d).{8,}$/],
        required:true
    },
    cart:{
        type:Object,
        default:{}
    },
    address:{type:String}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;