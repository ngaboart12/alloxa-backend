import express, { Router,Request,Response } from "express"
import { Login, Register } from "../controllers/Users"

const route = Router()

route.post('/register', Register)
route.post('/login', Login)

const UserRoute = module.exports = route
export default UserRoute