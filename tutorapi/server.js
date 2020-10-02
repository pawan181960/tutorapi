const express=require ("express");
var app=express();
var hbs= require('express-handlebars');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: '',
  layoutsDir: __dirname + '/views'
}));
app.listen(8080,()=>{
  console.log("server started....");
})
 app.set('view engine','hbs'); 

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
  
const Signup=require('./model/signup');
const Login=require('./model/login');
const URL="mongodb://localhost:27017/WB";
const mongoose=require('mongoose');
mongoose.connect(URL,{ useNewUrlParser: true,useUnifiedTopology: true });

app.get('/signup',(request,response)=>{
	response.render('signup');
})
app.post('/signup',(request,response)=>{
   var newsign=new Signup({
       name:request.body.name,
       phone:request.body.phone,
       email:request.body.email,
       password:request.body.password,
       confpass:request.body.confpass  
       });
newsign.save().then(data=>{
 console.log("data inserted");
        response.render('login',{msg:'Data inserted...'});
     });
});
app.get('/login',(request,response)=>{
	response.render('login');
})
app.post('/login',(request,response)=>{
   Signup.findOne({email:request.body.email,password:request.body.password},(err,result)=>{
      console.log(result);
      if(err) throw err;
      else if(result!=null)
      {
      response.render('login',{msg:"Login Sucess"});
      }
      response.render('login',{msg:"Login Fail "});
    });
  });
