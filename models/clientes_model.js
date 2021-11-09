const conexion = require("../config/conexion");
module.exports={
    insertar(nombre,direccion){
        return new Promise((resolve,reject)=>{
            conexion.query('insert into clientes (Nombre,Direccion) values (?,?)',[nombre,direccion],(err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados.insertID); 
            })
        })
    }
}