import express, { Router } from "express"
import { selectProduct, singleProduct, uploadProduct } from "../controllers/Products"
const route = Router()

 route.post("/add-prouct", uploadProduct)
 route.get("/select-product", selectProduct)
 route.get("/single-product/:id", singleProduct)

const ProductRoute = module.exports = route
export default ProductRoute