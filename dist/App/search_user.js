"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConfig_1 = require("../Config/DBConfig");
const HelperFunction_1 = require("../Middleware/HelperFunction");
const express = require('express');
const Searh = express.Router();
Searh.post("/user/search", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        const { query, status } = req.body;
        console.log(req.body, "body");
        const sql = `SELECT * FROM users WHERE full_name LIKE ? OR phone LIKE ? OR gotra LIKE ? OR occupation LIKE ? OR married LIKE ? OR address LIKE ? LIMIT 10`;
        DBConfig_1.connection.query(sql, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${status}%`, `%${query}%`], (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            else {
                res.json({
                    status: 200,
                    message: "Users List",
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
exports.default = Searh;
//# sourceMappingURL=search_user.js.map