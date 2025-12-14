import AuthService from "../repositories/auth.repository.js";

/** Login User */
export const login = async(req, res, next) => {
  try{
    const {email, password} = req.body
    if(!email || !password){
      return res.status(400).json({success:false, message:"Required valid field: 'email, password'."})
    };

    const userRes = await AuthService.loginUser(req.body)
    const {status, success, message} = userRes
    if(status>299){
      return res.status(status).json({success, message})
    };

    const {data} = userRes
    const {cookieData, ...restData} = data
    const {jwtData, jwtConfig} = cookieData
    res.cookie("JWT_TOKEN", jwtData, jwtConfig)

    return res.status(status).json({success, message, data:restData})
  }catch(error){
    next(error)
  }
};

/** Validate Cookies */
export const validateCookie = async(req, res, next) => {
  try{
    const {user} = req
    return res.status(200).json({success:true, message:"Valid Cookies.", data:user})
  }catch(error){
    next(error)
  }
};

/** Logout User */
export const logout = async(req, res, next) => {
  try{
    res.clearCookie("JWT_TOKEN", {
        httpOnly:false,
        secure:false,
        sameSite:"lax",
        path:"/"
      })
    return res.status(200).json({success:true, message:"User Logged-Out successfully."})
  }catch(error){
    next(error)
  }
};