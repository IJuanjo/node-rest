const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validarMongoose=require('mongoose-unique-validator');
let rolesValidator={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido.'
}
const UsuarioSchema=new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El password es obligatorio']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidator
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
})
UsuarioSchema.methods.toJSON=function(){
    const user=this;
    let objectUser=user.toObject();
    delete objectUser.password;
    return objectUser;
}

UsuarioSchema.plugin(validarMongoose,{message:'{PATH} debe ser unico'});

module.exports=mongoose.model('Usuario',UsuarioSchema);