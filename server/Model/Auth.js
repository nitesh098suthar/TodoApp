import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required : [true, 'Please provide name']
        },

        email:{
            type:String,
            required :[true, "Type your mail id"],
            unique: [true, "Wrong email/password"],
            validate : [validator.isEmail, "Wrong Format"]
        },

        password:{
            type:String,
            required :[true, "Type your password"],
            select : false,
            minLength: [8, "Password length is min"]
        },

        createdAt: {
            type: Date,
            default : Date.now
        },

        resetToken : {
            type: String,
            default : null
        },

        resetTokenExpire : {
            type : Date,
            default:null
        }      
    }
)

userSchema.method("comparePassword", async function (password){
    return await bcrypt.compare(password, this.password);
})


userSchema.method("genToken", function (){
const payload = {
    id : this._id

}
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : '5d'
    })
})


userSchema.pre("save", async function (next){
   if( this.isModified("password"))
   {
    this.password = await bcrypt.hash(this.password, 15)
   }
   else{
    next();
   }
})

export const UserModel = mongoose.model("User", userSchema);