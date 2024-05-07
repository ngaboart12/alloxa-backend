import mongoose from "mongoose";


interface BadgeModel {
    name:string,
    imageUrl:string
}

const BadgeSchema = new mongoose.Schema({
    name: {type: String,required:true},
    imageUrl: {type: String,required:true},
})


const BadgeModel = mongoose.model('Category', BadgeSchema)
export default BadgeModel