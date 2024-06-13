import express,{Request,Response} from "express"
import { checkout, webhook } from "../controllers/Payment"
const route = express.Router()


route.get("/success", async(req:Request, res:Response) => {
    res.send("Successfully");
});

route.get("/cancel", async(req:Request, res:Response) => {
    res.send("canceled");
});

route.post("/checkout", checkout)
route.post("/webhook", express.raw({type: "application/json"}),webhook)



const PaymentRouter = module.exports = route
export default PaymentRouter