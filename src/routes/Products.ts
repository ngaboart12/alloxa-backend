import express, { Router } from "express"
import { uploadProduct } from "../controllers/Products"
const route = Router()

 route.post("/add-prouct", uploadProduct)

const ProductRoute = module.exports = route
export default ProductRoute