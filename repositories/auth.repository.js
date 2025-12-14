import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserRespository from "./user.repository.js"


const AuthService = {
  loginUser : async(payload)=>{
    const {email, password} = payload
    const userExist = await UserRespository.findByEmail(email)
    if(!userExist){
      return {status:404, success:false, message:"User Record Not Found."}
    };

    const verifyPassword = await bcrypt.compare(password, userExist.password)
    if(!verifyPassword){
      return {status:400, success, message:"User password is invalid."}
    };

    const data = {
      user:{
        userId:userExist.id,
        userName:userExist.name,
        email:userExist.email
      }
    };

    const jwtSecret = process.env.JWT_SECRET
    const jwtData = jwt.sign(data, jwtSecret, {expiresIn:"2hr"})
    const jwtConfig = {
      httponly:true,
      secure:false,
      sameSite:"lax",
      path:"/",
      maxAge:2*60*60*1000
    };

    return {status:200, success:true, message:"User logged successfully.",
      data:{userName:userExist.name, email:userExist.email, cookieData:{jwtData, jwtConfig}}}
  }
};

export default AuthService;