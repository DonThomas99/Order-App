import { Request,Response } from "express";

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
        console.log('hee');
        
    console.log(req.body)
    res.send('hellow')
    
       }catch(error){
        console.log(error)
       } 
    }
    async deleteProduct (req:Request,res:Response){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }
    async editProduct (req:Request,res:Response){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default AdminController