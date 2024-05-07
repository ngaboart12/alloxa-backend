import express, {Express} from "express"
import dotenv from "dotenv"
import userRoute from "./routes/user"

const app:Express = express()

dotenv.config()
import "./config/config"
import ProductRoute from "./routes/Products"
import badgeRoute from "./routes/Badge"
import OrderRoute from "./routes/Order"

const PORT  = process.env.PORT || 5000

app.use(express.json())
app.use('/auth', userRoute)
app.use('/product', ProductRoute)
app.use('/badge', badgeRoute)
app.use('/order', OrderRoute)

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})