import { connection } from "../Config/DBConfig";
import { verifyToken } from "../Middleware/HelperFunction";

const express = require('express')

const AppProfile = express.Router() 

AppProfile.get("/app/get-profile",(req,res)=>{
    const isVerified = verifyToken(req);
    if(isVerified === true){
        connection.query('Select * FROM users WHERE id = ?',[req.query.id],(err,result)=>{
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
           else{
            res.json({
                status: 200,
                message: "User fetched successfully",
                data: result
            });
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

export default AppProfile;