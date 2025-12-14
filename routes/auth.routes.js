import express from "express"
import { login, logout, validateCookie } from "../controller/auth.controller.js"
import { authentication } from "../middleware/authenticate.js"

const AuthRouter = express.Router()

AuthRouter.post("/login",       login)

AuthRouter.get("/get-session",  authentication,   validateCookie)

AuthRouter.get("/logout",       authentication,   logout)

export default AuthRouter;