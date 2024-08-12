import { connection } from "../Config/DBConfig";
import { verifyToken } from "../Middleware/HelperFunction";

const express = require('express')

const AppContentRouter = express.Router()

AppContentRouter.get("/app/get-content", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        connection.query("SELECT * FROM content", (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            } else {
                res.json({
                    status: 200,
                    message: "Success",
                    data: result
                })
            }
        });
    } else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
})


AppContentRouter.post("/app/add-content", async (req, res) => {
    const isVerified = verifyToken(req)

    if (isVerified === true) {

        const { id, section, content } = req.body
        connection.query("UPDATE content SET content = ? WHERE section = ? AND id = ?",[content,section,id], (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            } else {
                res.json({
                    status: 200,
                    message: "Success",
                    data: null
                })
            }

        })
    } else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
})

export default AppContentRouter;