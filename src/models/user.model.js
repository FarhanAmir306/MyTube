import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 16,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
      require: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 3,
    },
    refreshToken: {
      type: String,
      // default:null
    },
  },
  { timestamps: true }
);

// ei fuction ta passwordhash save korar agee call hobe
userSchema.pre("save", async function (next) {
  // isModified eta infield method
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  // 1st password holo parametar er password
  // 2nd password holo this.password jodi hash kore dibo
  // compare method ta use kore password kina compare kore dibo
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
  return token;
};
userSchema.methods.generateRefreshToken = function () {
   const token = jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET ,
      
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
  return token;
};

export const User = mongoose.model("User", userSchema);
