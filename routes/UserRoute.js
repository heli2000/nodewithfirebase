import { Router } from "express";
import { addUser } from "../controllers/UserController.js";

const router = Router();

router.get('/',(req,res)=>{
    res.send({"message":"hello from node"});
});

router.post('/add/user',addUser);

export default router;