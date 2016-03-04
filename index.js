var jwt = require('express-jwt');
var app = require('express')();

var port = process.env.PORT || 7777;
 
 app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

app.get('/protected',
  jwt({secret: 'shhhhhhared-secret'}),
  function(req, res) {
    if (!req.user.admin) return res.send(401);
    res.send(200);
  });
  
  app.use(jwt({
  secret: 'hello world !',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));