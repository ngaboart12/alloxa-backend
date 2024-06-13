import { Request,Response } from "express";
import path from "path";
import CategoryModel from "../models/Category";
import multer  from "multer";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: "dbajwnjyd",
    api_key: "897836138214521",
    api_secret: "mHC6gUcP03EO9atkGLRGfNERVHU",
  });

const storage = multer.diskStorage({
    filename: (req,file,cb)=>{
        cb(null,file.fieldname +"-" + Date.now() + "-" + path.extname(file.originalname) )
    }
})

const upload = multer({
    storage: storage
}).single("categoryImg")

const addCategory = async (req:Request,res:Response)=>{
    try {
        upload(req,res, async(error)=>{
         
                if(error){
                    res.json({message:error.message})
                }
                const {name} = req.body
                const categoryImg:any = req.file?.path
            const result = await cloudinary.v2.uploader.upload(categoryImg,{
             folder: "category_images"
            })

            const insert = new CategoryModel({
                name: name,
                imageUrl: result.secureUrl
            })
            await insert.save()
            res.json({message:"Category Added succsfully", data:insert})
        })
        
    } catch (error:any) {
        res.json({message: error.message})
        
    }

}

export const selectCategory = async(req:Request,res:Response)=>{
    try {
        const category = await CategoryModel.find()
        res.status(200).json({data:{name:"sevelin"}})
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        
    }
}