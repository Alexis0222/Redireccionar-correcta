const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  if(req.session.loggedIn){

    req.flash('success','usted ya se encuentra logeado')
    res.render('index', { title: 'hola mundo' });
}else{
  req.flash('error','debes de iniciar session')

  res.render('auth/login')
}
});

module.exports = router;
