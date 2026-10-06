require('dotenv').config();
const express = require("express");
const app = express()
const PORT = 3000;

app.use(express.json())

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
    try{
    const bokID =  req.params.id
    const sql= "SELECT * FROM bokhylle WHERE bokid = $1"
    const verdi= [bokID]
    const result=  await pool.query(sql,verdi)
   
     if (result.rows[0] == undefined){
        res.status(404).json("Finne ingen bok med den id")
    }
    else
    {res.json(result.rows[0])}
    }
    catch(error){console.log(error)
        res.status(500).json("Feilmelding")

    }
})

app.post("/boker", async (req,res) => {
    const {tittel, forfatter, status} = req.body;
    const nyBOK= "INSERT INTO bokhylle (tittel,forfatter,status) VALUES ($1,$2,$3) RETURNING *"
    const bokInfo= [tittel,forfatter,status]
    const nyReg=await pool.query (nyBOK,bokInfo)
    res.json(nyReg.rows)
})

app.patch("/boker/:id", async(req,res) =>{
    const bokinfo= req.params.id
    const {status}= req.body
    const sqlupdate = "Update bokhylle set status=$1 WHERE bokid = $2 RETURNING *"
    const nyStatus = [status,bokinfo]
    const nyupdate = await pool.query(sqlupdate,nyStatus)
    res.json(nyupdate.rows)
})

app.delete("/boker/:id", async(req,res) => {
    const slettbokID = req.params.id
    const sqlslett= "DELETE FROM bokhylle WHERE bokid= $1 RETURNING *"
    const slettid = [slettbokID]
    const sqlsvar= await pool.query(sqlslett,slettid)
    res.json(sqlsvar.rows)

})