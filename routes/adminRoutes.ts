import express, { Request } from "express"
const admin_route = express.Router()

import AdminController from '../controllers/adminController'
const controller = new AdminController()

admin_route.post('/',(req:Request,res)=>{controller.loadLogin(req,res)})
admin_route.post('/addProduct',(req:Request,res)=>{controller.addProduct(req,res)})
admin_route.put('/editProduct',(req:Request,res)=>{controller.editProduct(req,res)})
export default admin_route