var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'session',
  keys: ['secretkey'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.get('/', function(req, res){
	console.log('before the task');
	req.session.todolist.push({task: 'faire le menage'});
	res.send('ok : /');
})

.get('/display', function(req, res){
	console.log(req.session.todolist);
	res.send('ok : /display');

})

app.listen(9000, function(){
	console.log('Server ok');
})