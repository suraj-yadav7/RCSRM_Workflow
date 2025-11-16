import UserRespository from "../repositories/user.repository.js";

/** User Services CRUD */
const UserService = {
  createUser : async(payload) =>{
    const {email} = payload
    const exist = await UserRespository.findByEmail(email)
    if(exist){
      return {status:400, success:false, message:"User Already Exist."}
    };

    const newUser = await UserRespository.create(payload)
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