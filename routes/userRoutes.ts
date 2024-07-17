import express,{Request} from "express"
const userRoutes = express.Router()
import  UserController  from "../controllers/userController"
const controller = new UserController()

userRoutes.post('/signUp',(req:Request,res)=>{controller.signUp(req,res)})
// userRoutes.get('/orderExists',(req:Request,res)=>{controller.orderExists(req,res)})
userRoutes.post('/orders',(req:Request,res)=>{controller.createOrder(req,res)})
userRoutes.put('/orders',(req:Request,res)=>{controller.updateOrder(req,res)})
userRoutes.get('/orders',(req:Request,res)=>{controller.getOrder(req,res)})
userRoutes.delete('/orders',(req:Request,res)=>{controller.deleteOrder(req,res)})


export default userRoutes
