const conexion=require("../config/conexion");
module.exports={
    
    obtener(){
        return new Promise((resolve,reject)=>{
            conexion.query('select ventas.idVentas,ventas.total,clientes.Nombre,clientes.Direccion from ventas inner join on ventas.id_cliente=clientes.id_clientes',(err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
    },
    obtenerPorId(id){
        return new Promise((resolve,reject)=>{
            conexion.query('select ventas.idVentas,ventas.total,clientes.Nombre,clientes.Direccion from ventas inner join on ventas.id_cliente=clientes.id_clientes where ventas.idVentas=?',[id],(err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
        
    },
    insertar(idCliente,total){
        
        return new Promise((resolve,reject)=>{
            conexion.query('insert into ventas (id_cliente,total) values(?,?)',[idCliente,total],(err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
    },
    obtenerProductosVendidos(idVenta){
        return new Promise((resolve,reject)=>{
            conexion.query('select productos.* from productos_ventas inner join productos.id_productos = productos_venta.idProductos where prodcutos.idProducto=?',[idVenta],(err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
 
    },

}