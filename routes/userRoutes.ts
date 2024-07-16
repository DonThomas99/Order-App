import express,{Request} from "express"
const userRoutes = express.Router()
import  UserController  from "../controllers/userController"
const controller = new UserController()

userRoutes.post('/signUp',(req:Request,res)=>{controller.signUp(req,res)})


export default userRoutes
