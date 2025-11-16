import express from "express";
import { createUser, deleteUser, fetchUser, updateUser } from "../controller/user.controller.js";


const UserRouter = express.Router()

UserRouter.post("/create",      createUser)

UserRouter.get("/fetch",        fetchUser)

UserRouter.put("/update",       updateUser)

UserRouter.delete("/delete",    deleteUser)


export default UserRouter;