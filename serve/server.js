const express=require('express');
require('./config/config')
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.get('/usuarios',(req,res)=>{
    res.json('GET')
})
app.post('/usuarios',(req,res)=>{
    const body=req.body;
    if(body.nombre===undefined){
        return res.status(400).json({
            type:'error',
            message:'El nombre es obligatorio'
        })
    }
    res.json({
        body
    })
})
app.put('/usuarios/:id',(req,res)=>{
    const id=req.params.id;
    res.json({id})
})
app.delete('/usuarios/:id',(req,res)=>{
    const id=req.params.id;
    res.json({id})
})

app.listen(process.env.PORT,()=>console.log('Run...'))