import express from 'express'
import mysql  from 'mysql2'
import cors from 'cors'
import bycrypt from 'bcrypt'

const app = express()

app.use(express.json())

app.use(cors())

app.listen(8081, ()=> {
    console.log("listening")
})