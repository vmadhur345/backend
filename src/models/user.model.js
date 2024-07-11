import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema=new Schema(
    {
        username: {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,  // cloudinary url
            required:true,
        },
        coverImage:{
            type:String,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String
        }
    },
    {timestamps:true}
)

userSchema.pre("save", async function (next) {
    // only when there is a  change in password 
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken=function(){
  return JsonWebTokenError.sign({
        _id:this._id,
        email:this.email,
        username:this.userSchema,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiredIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.method.generateRefreshToken=function(){
    return JsonWebTokenError.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiredIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User=mongoose.model("User",userSchema)