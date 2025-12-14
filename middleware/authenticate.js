import jwt from "jsonwebtoken"

export const authentication = async(req, res, next) => {
  try{
    const isCookie = req.cookies?.JWT_TOKEN
    if(!isCookie){
      return res.status(400).json({success:false, message:"Cookies Not Found."})
    };

    const jwtSecret = process.env.JWT_SECRET
    jwt.verify(isCookie, jwtSecret, (error, decode) => {
      if(error){
        return res.status(400).json({success:false, message:"Invalid cookie, You Are Not Authorized."})
      }
      req.user = decode.user
    });

    next()
  }catch(error){
    next(error)
  }
};