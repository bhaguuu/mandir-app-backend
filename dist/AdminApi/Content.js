"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConfig_1 = require("../Config/DBConfig");
const HelperFunction_1 = require("../Middleware/HelperFunction");
const express = require('express');
const ContentRouter = express.Router();
ContentRouter.get("/get-content", (req, res) => {
    let isVerify = (0, HelperFunction_1.verifyToken)(req);
    if (isVerify === true) {
        DBConfig_1.connection.query("SELECT * FROM app_content", (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal Srver Error",
                    data: err
                });
            }
            else {
                res.json({
                    status: 200,
                    message: "Success",
                    data: result
                });
            }
        });
    }
    else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
ContentRouter.post("/add-content", (req, res) => {
    let isVerify = (0, HelperFunction_1.verifyToken)(req);
    const { text, id } = req.body;
    if (isVerify === true) {
        DBConfig_1.connection.query("UPDATE app_content SET text = ? WHERE id = ?", [text, id], (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal Srver Error",
                    data: err
                });
            }
            else {
                res.json({
                    status: 200,
                    message: "Success",
                    data: result
                });
            }
        });
    }
    else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
exports.default = ContentRouter;
//# sourceMappingURL=Content.js.map