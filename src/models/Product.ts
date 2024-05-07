import mongoose from "mongoose";


interface ProductModel {
    name: string,
    category:any,
    badge: any,
    imageUrl:string,
    quickAction: boolean,
    price: number

}

const ProductSchema = new mongoose.Schema<ProductModel>({
    name: {type: String,required:true},
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    badge:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Badge"
    },
    imageUrl: {type:String,required:true},
    quickAction: {type:Boolean,default:false},
    price: {type:Number}

})

const  ProductModel = mongoose.model("Products", ProductSchema)
export default ProductModel