const express=require('express');
const app=express();
const {conectarDB}=require('../db/config')
conectarDB();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(require('./routes/usuarios'))

app.listen(process.env.PORT || 3000,()=>console.log('Run...'))