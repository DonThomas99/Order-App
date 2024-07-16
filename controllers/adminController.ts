import { Request,Response } from "express";
const Product = require('../Models/productModel')
import  { addProduct, ProductDetails } from "../interface/product";

export class AdminController{
    constructor(){

    }
    async loadLogin(req:Request,res:Response){
        try {
            const {userName,password} = req.body
            if(userName && password){
                if(userName == "admin@777"){
                    if(password == "777"){
                            res.status(200).json({message:'successfully LoggedIn'})
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
            console.log(error)
        }
    }
    
    async addProduct (req:Request,res:Response){
       try{
            const product:addProduct = req.body
            if (!product.productName || !product.price || !product.description) {
                return res.status(400).json({ message: 'Missing required fields' });
              }
            const newProduct = new Product({
                productName:product.productName,
                price:product.price,
                description:product.description
            })
            const savedProduct =await newProduct.save()
            if(savedProduct){
                res.status(201).json({message:'Successfully Added Product'})
            }else{
                res.status(409).json({message:"Error Adding Product"})
            }

       }catch(error){
        console.log(error)
        res.status(500).send('An error occurred');
       } 
    }
    async deleteProduct (req:Request,res:Response){
        try {
            const productId = req.body.productId;
            console.log('gewgw',productId)
            const deleteProduct = await Product.findByIdAndDelete(productId)
            if(!deleteProduct){
                return res.status(404).json({message:'Product not found'})
            }
            res.status(200).json({message:'Product Deleted Successfully'})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Internal Server Error'})
        }
    }
    async editProduct (req:Request,res:Response){
        try {
            const productId = req.params.id as string
            const product:Partial<ProductDetails> = req.body                
            const update = await Product.findOneAndUpdate(
                    {_id:productId},
                    {$set:product}
                )
                console.log(!!update);
                
                if(!update){
                    res.status(401).json({message:'Product Not Found'})
                }            
            res.status(200).json({message:'Successfully Updated Product'})
        } catch (error) {
            console.log(error);
        res.status(500).json({message:'Error Updating Product'})            
        }
    }
}

export default AdminController