import UserService from "../service/user.service.js";

/* ####################################### User Controllers ####################################### */

/** Create New User */
export const createUser = async(req, res, next) => {
  try{
    const {name, email, phoneNo, password, gender} = req.body
    if(!name || !email || !phoneNo || !password || !gender){
      return res.status(400).json({success:false, message:"Required valid fields: 'name, email, etc"})
    };

    const createRes = await UserService.createUser(req.body)
    const {status, ...restRes} = createRes
    if(!createRes.success){
      return res.status(status).json({...restRes})
    };

    return res.status(status).json({...restRes})
  }catch(error){
    next(error)
  }
};

/** Fetch Users */
export const fetchUser = async(req, res, next) => {
  try{
    const fetchRes = await UserService.fetchUser(req.query)
    const {status, ...restRes} = fetchRes
    if(!fetchRes.success){
      return res.status(status).json({...restRes})
    };

    return res.status(status).json({...restRes})
  }catch(error){
    next(error)
  }
};

/** Update User */
export const updateUser = async(req, res, next) => {
  try{
    const {id} = req.body
    if(!id){
      return res.status(400).json({success:false, message:"Required valid fields: 'id'."})
    };

    const updateRes = await UserService.updateUser(req.body)
    const {status, ...restRes} = updateRes
    if(!updateRes.success){
      return res.status(status).json({...restRes})
    };

    return res.status(status).json({...restRes})
  }catch(error){
    next(error)
  }
};

/** Delete User */
export const deleteUser = async(req, res, next) => {
  try{
    const {id} = req.query
    if(!id){
      return res.status(400).json({success:false, message:"Required valid fields: 'id'."})
    };

    const deleteRes = await UserService.deleteUser({id})
    const {status, ...restRes} = deleteRes
    if(!deleteRes.success){
      return res.status(status).json({...restRes})
    };

    return res.status(status).json({...restRes})
  }catch(error){
    next(error)
  }
};