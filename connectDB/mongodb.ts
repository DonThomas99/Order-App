import mongoose from 'mongoose'
require('dotenv').config()

const mongoURI = process.env.MONGOURI

    const connectToMongoDB = async () => {
        try {
            if(!mongoURI){
                console.log('MongoURI not defined');
                return;
            }            
            await mongoose.connect(mongoURI);
            console.log('Connected to MongoDB...');
        } catch (error) {
            console.error('Failed to connect to MongoDB...', error);
        }
    };
connectToMongoDB()
   export {connectToMongoDB}