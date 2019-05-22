var express = require('express');
var router = express.Router();
var User = require('../model/user');
var jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
    var user = new User({
      email: req.body.email,
      username: req.body.username,
      password: User.hashPassword(req.body.password),
      creation_dt: Date.now()
    });

    let promise = user.save();

    promise.then((doc) => {
      return res.status(201).json(doc);
    });

    promise.catch((err) => {
      return res.status(501).json({message: 'Error registering user!'});
    });
});

router.post('/login', (req, res, next) => {
  let promise = User.findOne({email: req.body.email}).exec(); // exec retuns a promise

  promise.then((doc) =>{
    if (doc) {
      if (doc.isValid(req.body.password)) {
        // generate token
        var token = jwt.sign({username: doc.username}, 'secret', {expiresIn: '3h'});

        return res.status(200).json(token);
        
      } else {
        return res.status(501).json({message: 'Unauthorized!'});
      }
    } else {
      return res.status(501).json({message: 'User email not registered!'})
    }
  });

  promise.catch((err) => {
    return res.status(501).json({message: `internal error! - ${err}`})
  });
});

router.get('/authenticate', verifyToken, function(req, res, next){
  return res.status(200).json(decodedToken.username);
});

var decodedToken = '';
function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token, 'secret', (err, tokendata) => {
    if (err) {
      return res.status(400).json({message: `Unauthorized request! - ${err}`});

    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  });
}


module.exports = router;
