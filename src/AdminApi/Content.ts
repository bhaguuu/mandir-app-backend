import { connection } from "../Config/DBConfig";
import { verifyToken } from "../Middleware/HelperFunction";

const express = require('express')

const ContentRouter = express.Router()

ContentRouter.get("/get-content",(req,res)=>{
    let isVerify = verifyToken(req);

    if(isVerify===true){
        connection.query("SELECT * FROM app_content",(err,result)=>{
            if(err){
                res.json({
                    status: 500,
                    message: "Internal Srver Error",
                    data: err
                })
            }else{
                res.json({
                    status: 200,
                    message: "Success",
                    data: result
                })
            }
        })
    }else{
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
    
})

ContentRouter.post("/add-content",(req,res)=>{
    let isVerify = verifyToken(req);
    const { text,id } = req.body
    if(isVerify===true){
        connection.query("UPDATE app_content SET text = ? WHERE id = ?",[text,id],(err,result)=>{
            if(err){
                res.json({
                    status: 500,
                    message: "Internal Srver Error",
                    data: err
                })
            }else{
                res.json({
                    status: 200,
                    message: "Success",
                    data: result
                })
            }
        })
    }else{
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
    
})

export default ContentRouter;