import express from "express"
import { AddOrder } from "../controllers/Orders"
import { checkout, webhook } from "../controllers/Payment"
const route = express.Router()


route.post("/checkout", checkout)
route.post("/webhook", express.raw({type: "application/json"}),webhook)



const PaymentRouter = module.exports = route
export default PaymentRouter