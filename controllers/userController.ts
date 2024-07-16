import { Request,Response } from "express";

export class UserController {
    constructor(){

    }
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
}

export default UserController