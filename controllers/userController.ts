import { Request,Response } from "express";
const Order = require('../Models/OrderModel')
const Product = require('../Models/productModel')
export class UserController {
    constructor(){}
    async signUp (req:Request,res:Response){
        try {
            const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
            const {userName,password} = req.body
            if(userName && password){
                if(usernameRegex.test(userName)){
                    if(passwordRegex.test(password)){
                            res.status(200).json({message:'successfully Signed Up'})
                    }else{
                        res.status(400).json({message:'Invalid Password'})
                    }
                }else{
                    res.status(400).json({message:'Invalid userName'})

                }
            }else{
                res.status(401).json({message:'Please Enter credentials'})
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    async login(req:Request,res:Response){
        try {
            const {userName,password} = req.body
            if(userName && password){
        
            }else{
                res.status(401).json({message:'Please Enter credentials'})
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async orderExists(req:Request,res:Response){
        try {
            const userId:string = req.body.userId as string
            const orderExists = Order.find({userId:userId})
            if(orderExists){
                return res.status(200).json({value:1})
            } else{
                return res.status(200).json({value:0})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Checking Order'})            
        }
    }

    async createOrder(req:Request,res:Response){
        try {
            const {userId, productId} = req.body
            const product = await Product.findOne({_id:productId})
            if(product){
                const newOrder = new Order({
                    userId:userId,
                    productIds:[productId],
                    totalAmount:product.price
                })
                newOrder.save()
                res.status(200).json({message:'Order Created Successfully'})
            }else{
                    res.status(409).json({message:'Product Not Found'})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Creating an Order'})
            
        }
    }
    async updateOrder(req:Request,res:Response){
        try {
            const {orderId,productId} = req.body
            let order = await Order.findById(orderId).populate('productIds')
            if(!order){
                return res.status(404).json({message:'Order Not Found'})
            }    

            const product = await Product.findById(productId)
            if(!product){
                return res.status(404).json({message:'Product not found'})
            }

            const productIndex = order.productIds.findIndex((p: typeof Product) => p._id.equals(productId));
                
            if(productIndex !== -1){
                order.productIds.splice(productIndex, 1);
                order.totalAmount -= product.price
            } else{
                order.productIds.push(product);
                order.totalAmount += product.price;
            }

            await order.save()

            if(order.productIds.length == 0){
                await Order.deleteOne({_id:orderId})
                return res.status(200).json({message:'Order deleted due to no products'})
            }

            res.status(200).json({order:order,message:'Order Updated Successfully'})

        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Updating  Order'})            
            
        }
    }
    async getOrder(req:Request,res:Response){
        try {
            const orderId = req.body.orderId
            if(!orderId){
                return res.status(401).json({message:'Bad request'})
            }
            const order = await Order.findOne({_id:orderId})
            if(order){
                return res.status(200).json({order:order})
            }else{
                res.status(401).json({message:'Order Not Found'})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Retrieving Order'})            
        }
    }
    async deleteOrder(req:Request,res:Response){
        try {
            const {orderId} = req.body
            if(orderId){
                const deletion = await Order.deleteOne({_id:orderId})
                if(deletion){
                    res.status(200).json({message:'Successfully Deleted Order'})
                }else{
                    res.status(401).json({message:'Order Not Found'})

                }
            } else{
                res.status(401).json({message:'OrderId Not Found'})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Deleting Order'})
            
        }
    }
}

export default UserController