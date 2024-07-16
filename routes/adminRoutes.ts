import express, { Request } from "express"
const admin_route = express.Router()

import AdminController from '../controllers/adminController'
const controller = new AdminController()

admin_route.post('/',(req:Request,res)=>{controller.loadLogin(req,res)})
admin_route.post('/Product',(req:Request,res)=>{controller.addProduct(req,res)})
admin_route.put('/Product/:id',(req:Request,res)=>{controller.editProduct(req,res)})
admin_route.delete('/Product',(req:Request,res)=>{controller.deleteProduct(req,res)})
export default admin_route