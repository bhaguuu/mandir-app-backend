import { connection } from "../Config/DBConfig";
import { verifyToken } from "../Middleware/HelperFunction";

const express = require('express')

const AddFamily = express.Router()

AddFamily.post("/add-member",async (req,res)=>{
    const isVerified = verifyToken(req)
    console.log(req.body,"req.body add");
    
    if (isVerified===true) {
        const {  id , members } = req.body;
        let userIds = []
        Promise.all(
            members.map((member)=>{
               
                
               return new Promise((resolve,reject)=>{

                const { full_name , email , phone , gender , occupation , age , address , married } = member
                connection.query("SELECT * FROM users WHERE email = ? OR phone = ?",[email,phone],(err,result)=>{
                    if(err){
                       reject(err)
                    }
            
                    const userExist = result
                    console.log(userExist,"userExist");
                    
                    if(userExist.length > 0){
                        userIds.push(userExist[0].id)
                       connection.query('UPDATE users SET members = ? WHERE id = ?',[JSON.stringify(userIds),id],(err,res)=>{
                        if(err){
                           
                            reject(err)
                        }
                       else{
                        console.log(res,"res is if" );
                        
                        resolve(res)
                       }
                       })
                    }else{
                        connection.query('INSERT INTO users SET ?',member,(err,res)=>{
                            if(err){
                                console.log("err is ",err);
                                
                                reject(err)
                            }
                            else{
                                console.log("res is",res);
                            connection.query('SELECT * FROM users WHERE email = ?',[email],(err,res)=>{
                                if(err){
                                    reject(err)
                                }
                                if(res.length > 0){
                                    userIds.push(res[0].id)
                                    connection.query("UPDATE users SET members = ? WHERE id = ?",[JSON.stringify(userIds),id],(err,res)=>{
                                        if(err){
                                            reject(err)
                                        }
                                        resolve(res)
                                    });
                                }
                            });
                            }
                        });
                        
        
                    }
                })
               })
            })
        ).then((resolve)=>{
            res.json({
                status: 200,
                message: 'Members Added', data: resolve
            });
        }).catch((err)=>{
            res.json({
                status: 500,
                message: 'Something went wrong', data: err
            });
        })
    } else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
    
})



export default AddFamily