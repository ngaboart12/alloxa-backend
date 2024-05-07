import express  from "express";
import { AddBadge } from "../controllers/Badge";

const route = express.Router()


route.post('/addBadge', AddBadge)


const badgeRoute = module.exports = route
export default badgeRoute