import mongoose from "mongoose";
const {Schema} = mongoose;
const OrderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    productIds:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product',
            required:true
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    }
})

const Order = mongoose.model('Order',OrderSchema)
module.exports = Order