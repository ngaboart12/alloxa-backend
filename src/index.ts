import express, {Express} from "express"
import dotenv from "dotenv"
import userRoute from "./routes/user"
import cors from "cors"

const app:Express = express()

dotenv.config()
import "./config/config"
import ProductRoute from "./routes/Products"
import badgeRoute from "./routes/Badge"
import OrderRoute from "./routes/Order"
import categoryRoute from "./routes/Category"
import PaymentRouter from "./routes/Payment"
const PORT  = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.get('/', (req,res)=>{
    res.send("hello")
})
app.use('/auth', userRoute)
app.use('/product', ProductRoute)
app.use('/badge', badgeRoute)
app.use('/order', OrderRoute)
app.use('/category',  categoryRoute)
app.use('/',  PaymentRouter)

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})