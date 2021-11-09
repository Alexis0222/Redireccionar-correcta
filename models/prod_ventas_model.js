const conexion = require("../config/conexion");
module.exports={
    insertar(idVentas,idProducto){
        return new Promise((resolve,reject)=>{
            conexion.query('insert into productos_venta (id_ventas,id_producto) values (?,?)',[idVentas,idProducto],(err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados.insertID); 
            })
        })
    }
}