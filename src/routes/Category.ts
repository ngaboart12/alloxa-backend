import express from  "express"
import { selectCategory } from "../controllers/Category"
const route = express.Router()

route.get("/category", selectCategory)

export default route

