import mongoose from "mongoose";


interface OrderModel {
    personInfo: any,
    address: [],
    payment: string,
    status: string,
    totalAmount: number,
    product: [
        {
            name: string,
            price: number
        }

    ]

}

const  OrderSchema = new mongoose.Schema<OrderModel>({
    personInfo: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    address: {type:[String],required:true},
    payment: {type:String,required:true},
    status: {type:String,required:true,enum: ["pending","proccess","completed"],default:"pending"},
    totalAmount: {type:Number,required:true},
    product: [
        {
            name: {type:String},
            price: {type:String}
        }
    ]


})

const OrderModel = module.exports = mongoose.model("Orders", OrderSchema)
export default OrderModel