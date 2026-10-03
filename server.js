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

app.get("/boker", async(req,res) =>{
    const minDB= 'SELECT * FROM bokhylle'
    const resultat= await pool.query(minDB)
    res.json(resultat.rows)
   
}) 

app.get("/boker/:id", async(req,res) =>{
    const bokID =  req.params.id
    const sql= "SELECT * FROM bokhylle WHERE bokid = $1"
    const verdi= [bokID]
    const result=  await pool.query(sql,verdi)
    res.json(result.rows)
})