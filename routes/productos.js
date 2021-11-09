const express=require('express');
const router= express.Router();
const pm= require("../models/productos_model");
router.get('/',function(req,res,next){
    if(req.session.loggedIn){
    pm.obtener().then(productos =>{
      //  res.json(productos)
      res.render('productos/ver',{productos:productos})
    }).catch(err =>{
        req.flash('error','error')
        req.render('index')
    })
}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
  }
}),
router.get('/agregar',function(req,res,next){
    if(req.session.loggedIn){
    res.render('productos/agregar')
}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
  }
});
router.post('/insertar',  function(req,res,next){
    //Obtener nombre y precio y esto va del body
    if(req.session.loggedIn){
    const {nombre,precio} = req.body
    if(!nombre||!precio){
        req.flash('error','error no hay precio ni nombre')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
         }
    pm.insertar(nombre,'',precio).then(resultado => {
        pm.obtener().then(productos => {
            req.flash('success','Se guardo correctamente')
            res.render('productos/ver',{productos:productos})
        }).catch(err => {
         //Cambiar a mensaje flash enviado a un render
            
            req.flash('error','Error al obtener')
            
            pm.obtener().then(productos=>{
    
                res.render('productos/ver',{productos:productos})
            })
        })
    }).catch(err => {
        req.flash('error','No se pudo crear el producto')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
    })

}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
}

});
router.get('/eliminar/:id',function(req,res,next){
    //200/500
    if(req.session.loggedIn){
    pm.eliminar(req.params.id).then(()=>{
        pm.obtener().then(productos => {
            req.flash('success','Se elimino correctamente')
            res.render('productos/ver',{productos:productos})
        }).catch(err => {
         //Cambiar a mensaje flash enviado a un render
         req.flash('error','Error al eliminar!!')   
          pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
        })
    }).catch(err => {
        //Cambiar a mensaje flash enviado a un render
        req.flash('erro','error al borrar')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
    })}else{
        req.flash('error','Tiene que iniciar session primero!!')
        res.render('auth/login')
    }

});
router.get('/:id',  function(req,res,next){
    if(req.session.loggedIn){
    pm.obtenerPorId(req.params.id).then(producto =>{
        if(producto){
            res.json(producto)
        }else{ 
          req.flash('error','No se encontro el articulo')
           pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
        }

    }).catch(err =>{
        req.flash('error','error al obtener el articulo')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
    })
}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
  }

});
router.get('/editar/:id',function(req,res,next){
    if(req.session.loggedIn){
    pm.obtenerPorId(req.params.id).then(producto =>{
        if(producto){
            res.render('productos/editar',{producto:producto})
        }else{
          req.flash('error','No se encontro el articulo')
           pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
        }

    }).catch(err =>{
        req.flash('error','error al obtener el articulo')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
    })
}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
  }
});
router.post('/actualizar',  function(req,res,next){
    if(req.session.loggedIn){
    const {id,nombre,precio} = req.body
    if(!nombre||!precio||!id){
   req.flash('error','No hay suficientes datos')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
    }
   
   
    pm.actualizar(id,nombre,precio).then(()=>{
        pm.obtener().then(productos => {
            req.flash('success','Se modifico correctamente')
            res.render('productos/ver',{productos:productos})
        }).catch(err => {
         //Cambiar a mensaje flash enviado a un render
         req.flash('error','error al modificar')
         pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        }) 
    })

    }).catch(err=>{
        req.flash('error','No hay suficientes datos')
        pm.obtener().then(productos=>{
    
            res.render('productos/ver',{productos:productos})
        })
    })}else{
        req.flash('error','Tiene que iniciar session primero!!')
        res.render('auth/login')
    }
});


module.exports=router;