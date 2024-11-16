import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// // secure password with bcrypt
// userSchema.pre("save", async function (next) {
//   const user = this;
// //   if (user.isModified("password")){
// //     next();
// //   }
//   try {
//     const saltRounds = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, saltRounds);
//     user.password = hash_password;
//     next();
//   } catch (error) {
//     // next(error);
//   }
// });

// compare the paasword

userSchema.methods.comparePassword = async function(password){
  return bcrypt.compare(password, this.password);
}

// json web token

userSchema.methods.generateToken=async function(){
try {
return jwt.sign({
  userId: this._id.toString(),
  email: this.email,
  isAdmin: this.isAdmin
},
process.env.JWT_SECRET_KEY,
{
  expiresIn:"30d",
}
) 
} catch (error) {
  console.log(error);
}
}

const User = new model("User", userSchema);

export default User;
