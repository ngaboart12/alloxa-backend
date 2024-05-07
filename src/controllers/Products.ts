import express, { Request, Response } from "express";
import path from "path";
import ProductModel from "../models/Product";
import multer from "multer";
import cloudinary from "cloudinary"
import  "../config/Cloudinary"; 




const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "" + Date.now() + "" + path.extname(file.originalname)
    );
  },
});

const uploads = multer({
  storage: storage,
}).single("image");

export const uploadProduct = async (req: Request, res: Response) => {
  uploads(req, res, async function (error) {
    if (error) {
      res.json({ message: error.message });
    } else {
      const { name, category, badge, price } = req.body;
      const image: any = req.file?.path;
      const result: any = cloudinary.v2.uploader.upload(image, {
        folder: "product_image",
      });

      const newProduct = await ProductModel.create({
        name: name,
        category: category,
        badge: badge,
        price: price,
        imageUrl: result.secure_url,
      });
      if (newProduct) {
        res.json({ data: newProduct });
      }
    }
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
   
    const { id } = req.params;
    const checkBlog = await ProductModel.findById(id);

    if (checkBlog) {
      
      
        uploads(req, res, async (err) => {
          if (err) {
            return res.status(500).json({ message: "Error uploading file", error: err });
          }

          try {
            const { name, category, badge, price } = req.body;
            const imageUrl:any = req.file?.path;
            let updateData:any
            if(imageUrl){

           

            const result = await cloudinary.v2.uploader.upload(imageUrl, {
              folder: "product_image",
            });

             updateData = {
              name,
              category,
              badge,
              price,
              image: result.secure_url,
            };
          }else{
            updateData = {
              name,
              category,
              badge,
              price,
             
          }
        }
    
            const updatedProduct = await ProductModel.findByIdAndUpdate(id,  updateData, { new: true });

            if (updatedProduct) {
              res.status(200).json({ updatedProduct });
            } else {
              res.status(404).json({ message: "Failed to update blog" });
            }
          } catch (error:any) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
          }
        });
      
    } else {
      res.status(404).json({ message: "No blog available" });
    }
  } catch (error: any) {

    res.status(500).json({ message: error.message });
  }
};

export const selectProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.find().populate('Category').populate('Badge')
    if(product && product.length >0){
      res.status(200).json({data:product})
    }
  } catch (error:any) {
    res.json({message:error.message})
  }
};

export const singleProduct =  async (req:Request,res:Response)=>{
  try {
    const {id} = req.params
    const product = await ProductModel.findById(id)
    if(product){
      res.json({data:product})

    }else{
      res.json({message:"No product found"})
    }
    
  } catch (error:any) {
    res.json({message:error.message})
    
  }
}
