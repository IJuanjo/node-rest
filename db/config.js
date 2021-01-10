const mongoose = require('mongoose');
const conectarDB = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log('Conectado!')


    } catch (error) {
        console.log(error)
        throw new Error('Error en la hora de iniciar la conexion')
    }


}
module.exports = {
    conectarDB
};