import User from "../models/user.model.js"

/** DB Operations */
const UserRespository = {
  fetchAll     :  ({})    =>  User.find({}),

  fetchById    :  (id)    =>  User.findById(id),

  findByEmail  :  (email) =>  User.findOne({email}),

  create       :  (data)  =>  User.create(data),

  update       :  (id, data) => User.findByIdAndUpdate(id, data, {new:true}),

  delete       :  (id)    =>  User.findByIdAndDelete(id)
};

export default UserRespository;