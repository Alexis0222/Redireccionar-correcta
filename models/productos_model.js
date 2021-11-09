const conexion=require("../config/conexion");
 const fs= require('fs');
const { resolve } = require("path");
const path = require("path");
//CRUD - Create,READ,UPDATE,DELETE
module.exports={
    
 
insertar(nombre,descripcion,precio){

    return new Promise((resolve,reject) => {

        conexion.query('insert into productos (Nombre,descripcion,precio)'+
       ' values (?,?,?)',[nombre,descripcion,precio],(err,resultado) => {
           if (err)reject(err);
           else resolve(resultado)
       })
    })

},
    obtener(){

        return new Promise((resolve,reject)=>{
        
            conexion.query('select idProductos,Nombre,precio from productos',(err,resultados)=>{
        
                if(err)reject(err);
                else resolve(resultados);
            })
        })
    },
  /*  actualizar(id,Nombre,descripcion,precio){
        return new Promise((resolve,reject)=>{
            conexion.query('update productos set Nombre=? , descripcion=? , precio=? , where idProductos=?',[id,Nombre,descripcion,precio],(err)=>{
                if(err)reject(err);
                else resolve();
            
            })
        })
    },
*/actualizar(id,nombre,precio){

        return new Promise((resolve,reject)=>{
            conexion.query('update productos set nombre =?,'+
            'precio=? where idProductos=?',[nombre,precio,id], (err)=>{
                if(err)reject(err);
                else resolve();
            })
        })
    },
    
    eliminar(id){
        //TODO - Agregar borrado de fotos




        return new Promise(async(resolve,reject)=>{
            const fotos=await this.obtenerFotos(id)
            for(let i=0; i<fotos.length; i++){
                await fs.unlinkSync(path.join(__dirname,"fotos_productos",fotos[i].foto))
            }
            conexion.query('delete from productos where idProductos=? ',[id], (err)=>{
                if(err)reject(err);
                else resolve();
            })
        })
    },
    agregarFoto(idProducto,nombreFoto){
        return new Promise((resolve,reject)=>{
            conexion.query('INSERT INTO fotos_productos (idProducto,foto) VALUES(?,?)',[idProducto,nombreFoto],(err,resultado)=>{
                if(err)reject(err);
                else resolve(resultado.insertId);
            
            })
        })
    },
    obtenerFotos(idProducto){
    return new Promise((resolve,reject)=>{
        conexion.query('SELECT idproducto,foto FROM fotos_productos WHERE idproducto=?'  ,[idProducto],(err,resultado)=>{
            if(err)reject(err);
            else resolve(resultado);
        });
    });
},
obtenerPorId(id){
    return new Promise((resolve,reject)=>{
        conexion.query('SELECT * FROM productos WHERE idProductos=?'  ,[id],(err,resultado)=>{
            if(err)reject(err);
            else resolve(resultado[0]);
        });
    });
    
},
obtenerPrimeraImagen(idProducto){
    return new Promise((resolve,reject)=>{
        conexion.query('SELECT foto FROM fotos_productos WHERE idproducto=? limit 1'  ,[idProducto],(err,resultado)=>{
            if(err)reject(err);
            else resolve(resultado[0].foto);
        });
    });

},
obtenerConFotos(){
    return new Promise((resolve,reject) => {

        conexion.query('select *  form productos',
        async(err,resultados) =>{

            if(err)reject(err)
            else {
                for(let x=0;x<resultados.length;x++){
                    resultados[x].foto= await this.obtenerPrimerFoto(resultados[x].id)
                }

                resolve(resultados)
            }
        }
        )
    })
},
}