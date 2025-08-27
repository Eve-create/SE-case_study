import express from 'express'
import mysql  from 'mysql2'
import cors from 'cors'
import bycrypt from 'bcrypt'

const app = express()

app.use(express.json())

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db",
})

const salt = 5;
app.post("/register", (req,res)=> {
    const sql ="INSERT INTO user (`username`, `email`, `password`) VALUES (?)";
    bycrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json("Error")
        const values = [req.body.username,req.body.email,hash]
        db.query(sql,[values],(err,result)=>{
            if(err) console.log(err);
            else return res.json(result)
        })
    })
})

app.post("/login", (req,res)=> {
    const sql ="SELECT * FROM user WHERE `email` = ?";
    db.query(sql,[req.body.email],(err,result)=>{
        if(err) return res.json({Error:"Error"})
        else{
            if(result.length > 0){
                bycrypt.compare(req.body.password.toString(),result[0].password,(err,response)=>{
                    if(err) return res.json({Error:"Error"})
                    if(response) return res.json({Status:"Success"})
                    else return res.json({Error:"Wrong password"})
                })
            }else{
                return res.json({Error:"Email not found."})
            }
        }
    })
    
})

app.listen(8081, ()=> {
    console.log("listening")
})