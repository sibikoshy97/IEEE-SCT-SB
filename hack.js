const express=require('express')
const app=express()

app.use(express.static('public'));

var Datastore=require('nedb')
var db=new Datastore({filename:'store.db',autoload:true})

app.set('view engine','ejs')

/*app.set('port',process.env.PORT||5000)*/


app.get('/',function (req,res) {
	console.log(__dirname)	
	res.sendFile(__dirname+'/public/firstpage1.html')
})

app.get('/login',function (req,res) {
	console.log(__dirname)
	res.render('login')
})
app.get('/signup',function (req,res) {
	console.log(__dirname)	
	res.render('signup')
})
app.get('/gallery',function (req,res) {
	res.render('gallery')
})

app.get('/contact',function (req,res) {
	res.render('contact')
})
app.get('/loginSubmit',function (req,res) {
	var useremail=req.query.email;
	var userpassword=req.query.password;
	var userbranch=req.query.branch;
	var person={
		"Email":useremail,
		"Password":userpassword,
		"Branch":userbranch
	}
	db.find(person,function (err,result) {
		console.log(result)
		if(result.length>0){
			if(person.Branch=="cse"){
			
			res.render('csi')}
			else{
				res.render('ece')
			}
		}
		else{
			res.send("email and password wrong")
		}
	
	})
})
app.get('/signupSubmit',function (req,res) {
	Name=req.query.name;
	useremail=req.query.email;
	userbranch=req.query.branch;
	userpassword=req.query.password;
	var per={
		"Name":Name,
		"Email":useremail,
		"Branch":userbranch,
		"Password":userpassword
	}

	db.insert(per,function (err,result) {
		console.log(result);
		res.render('login')
	})
})

app.listen(3000,function () {
	console.log('Example app is listening at 3000')
})