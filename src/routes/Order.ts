import express from "express"
import { AddOrder } from "../controllers/Orders"
const route = express.Router()


route.post("/addOrder", AddOrder)



const OrderRoute = module.exports = route
export default OrderRoute