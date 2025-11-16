import User from "../models/user.model.js"

/** DB Operations */
const UserRespository = {
  fetchAll     :  ({})    =>  User.find({}),

  fetchById    :  (id)    =>  User.findById(id),

  findByEmail  :  (email) =>  User.findOne({email}),

  create       :  (data)  =>  User.create(data),

  delete       :  (id)    =>  User.findByIdAndDelete(id),

  update       :  (id, data) => User.findByIdAndUpdate(id, data, {new:true})
};

export default UserRespository;