const express = require('express');
const connection = require('../config/connection');
require('dotenv').config();
const moment = require('moment');

const router = express.Router();

router.post('/add-user', async (req, res) => {

    try {

        const { name, email, password, contact } = req.body;

        const current_date = moment().format("YYYY-MM-DD");

        const insertQuery = `INSERT INTO users (name, email, password, contact, status, created, modified) values($1, $2, $3, $4, $5, $6, $7)`;
        const insertValues = [name, email, password, contact, 1, current_date, current_date];

        const insertedUser = await connection.query(insertQuery, insertValues);

        res.json({ status: 1, message: "User data added successfully" });

    } catch (error) {
        console.log("Error", error);
    }

})

router.get('/users', async (req, res) => {

    const getQuery = `SELECT * FROM users WHERE status=1`;

    await connection.query(getQuery, (req, result, err) => {

        const userData = result.rows;

        if (err) {
            console.log("Error", err);
            res.json({ status: 0, message: "Internal server error" });
        } else if (result.rows.length === 0) {
            res.json({ status: 0, message: "Users Not found" });
        } else {
            res.json({ status: 1, message: "Users data found", data: userData })
        }

    })

})

module.exports = router;