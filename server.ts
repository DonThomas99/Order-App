import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session,{SessionOptions} from 'express-session'
import http from 'http'

export const createServer = ()=>{
    const app = express()
    const httpServer = http.createServer(app)
    app.use(
        cors({
            origin:'http://localhost:4200',
            credentials:true
        })
    )
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    const sessionOptions:SessionOptions={
        secret:'your-secret-key',
        resave:false,
        saveUninitialized:false,
        cookie:{
            secure:false,
            maxAge:36000000,
        }
    }
    app.use(session(sessionOptions))
    
}