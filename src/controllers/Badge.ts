import BadgeModel from "../models/Badge";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";




export const AddBadge = async (req: Request, res: Response) => {
  try {
 
      const { name } = req.body;
      const imageUrl: any = req.file?.path;

   
      const savedBadge = new BadgeModel({
        name:name,
      })
      await savedBadge.save()
      res.json({data:savedBadge})
  
  } catch (error: any) {
    res.json({ message: error.message });
  }
};
