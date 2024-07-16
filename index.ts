import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
require('dotenv').config()
import session, { SessionOptions } from 'express-session';
import http from 'http'
import { connectToMongoDB } from './connectDB/mongodb'
import { connectToMySQL } from './connectDB/mysql'
import admin_route from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

export const createServer = async ()=>{
    const app = express()
    const httpServer = http.createServer(app)
    // app.use(
    //     cors({
    //         origin:'http://localhost:4200',
    //         credentials:true
    //     })
    // )
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
     const sessionOptions:SessionOptions= {
        secret:'your-secret-key',
        resave:false,
        saveUninitialized:false,
        cookie:{
            secure:false,
            maxAge:36000000,
        }
    }
    app.use(session(sessionOptions))
   app.use(morgan('dev'))
    app.use('/admin',admin_route)
    app.use('/',userRoutes)


    try {
        await connectToMongoDB()        
    } catch (error) {
        console.log('MongoDB Error',error);
    }
    // try {
    //     await connectToMySQL()        
    // } catch (error) {
    //     console.log('MySQL Error',error);   
    // }
    httpServer.listen(3000,()=>{
        console.log('server is running on 3000');
        
    })

}
createServer()