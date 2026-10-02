require('dotenv').config();
const express = require("express");
const app = express()
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server kjører på http://localhost:${PORT}`)
})

const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Bok',
    password: process.env.Db_passowd,
    port: 5432
})
