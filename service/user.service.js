import UserRespository from "../repositories/user.repository.js";
import bcrypt from "bcrypt"

/** User Services CRUD */
const UserService = {
  createUser : async(payload) =>{
    const {email, password, ...restPayload} = payload
    const exist = await UserRespository.findByEmail(email)
    if(exist){
      return {status:400, success:false, message:"User Already Exist."}
    };
    console.log("pass: ", password)

    const salt = await bcrypt.genSalt(11)
    const hashPassword = await bcrypt.hash(password, salt)
    console.log("create payload: ",{email, password:hashPassword, restPayload}  )
    const newUser = await UserRespository.create({email, password:hashPassword, ...restPayload})
    return {status:201, success:true, message:"User Created Successfully.", data:newUser}
  },

  fetchUser : async(payload) => {
    if(payload.id){
      const singleRecord = await UserRespository.fetchById(payload.id)
      if(!singleRecord){
        return {status:404, success:false, message:"User Not Found."}
      };

      return {status:200, success:true, message:"User Record Fetched Successfully.", data:singleRecord}
    };

    const allUser = await UserRespository.fetchAll({})
    return {status:200, success:true, message:"All User Fetched Successfully.", data:allUser}
  },

  updateUser : async(payload) => {
    const {id, ...restData} = payload
    const updateRecord = await UserRespository.update(id, restData)
    if(!updateRecord){
      return {status:404, success:false, message:"User Not Found."}
    };

    return {status:200, success:true, message:"User Updated Successfully.", data:updateRecord}
  },

  deleteUser : async(payload) => {
    const {id} = payload
    const deleteRecord = await UserRespository.delete(id)
    if(!deleteRecord){
      return {status:404, success:false, message:"User Not Found."}
    };

    return {status:200, success:true, message:"User Deleted Successfully.", data:deleteRecord}
  }
};

export default UserService;