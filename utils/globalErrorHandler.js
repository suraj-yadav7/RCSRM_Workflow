const globalErrorHandler = async(err, req, res, next) => {
  const {method, url} = req
  console.log(`Error for ${method} method at ${url}, Error message: ${err.stack}`)
  return res.status(500).json({success:false, message:`${err}` || "Internal Server Error."})
};

export default globalErrorHandler;