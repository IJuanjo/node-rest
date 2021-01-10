const express=require('express');
const app=express();
const bscypt=require('bcrypt');
const _=require('underscore');
const Usuario=require('../model/usuario');

app.get('/usuarios',async(req,res)=>{
    let desde=req.query.desde || 0;
    desde=Number(desde);
    let limit=req.query.limite || 5;
    limit=Number(limit);
    await Usuario.find({estado:true},'nombre email role estado google img')
        .skip(desde)
        .limit(limit)
        .exec((err,usuarios)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        Usuario.count({estado:true},(err,count)=>{
            res.json({
                ok:true,
                usuarios,
                cantidad:count
            })

        })
    })
})


app.post('/usuarios',async (req,res)=>{
    const body=req.body;

    const usuario=new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bscypt.hashSync(body.password,10),
        role:body.role,
    })

     await usuario.save((err,user)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            usuario:user
        })

        
    })

})
app.put('/usuarios/:id',(req,res)=>{
    const id=req.params.id;
    const body=_.pick(req.body,['nombre','email','img','role','estado']);
    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,u)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        if(!u){
            return res.status(400).json({
                ok:false,
                err:{
                    msg:'Usuario no encontrado'
                }
            })
        }

        res.json({
            usuario:u
        })

    })
})
app.delete('/usuarios/:id',(req,res)=>{
    const id=req.params.id;
    //REMOVE -> findByIdAndRemove(id,callack) 
    Usuario.findByIdAndUpdate(id,{estado:false},{new:true},(err,usuario)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        if(!usuario){
            return res.status(400).json({
                ok:false,
                err:{
                    msg:'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok:true,
            usuario
        })
    })




})


module.exports=app;