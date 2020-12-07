const express=require('express');
const app = express();
const path = require("path");
const fs= require("fs");
const bodyparser = require('body-parser')
const port = 8000;

//import mongoose first
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});

//define mongoose schema
var contactSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	address: String,
	desc: String,
})

var contact = mongoose.model('contact',contactSchema)


//EXPRESS SPECIFIC STUFF

app.use('/static' ,express.static('static'));//serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF

app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS

app.get("/", (req,res)=>{
	res.render('home.pug');
});

app.get("/contact", (req,res)=>{
	console.log(req.body)
	res.render('contact.pug');
})


app.post("/contact", (req,res)=>{
    
    var myData =  new contact(req.body)
    myData.save().then(()=>{
    	res.send("this item has been saved to the db")
    }).catch(()=>{
    	res.status(400).send("item has been not saved")
    })


	/*console.log(req.body)
	name= req.body.name;
	phone= req.body.phone;
    email= req.body.email;
	address= req.body.address;
	desc= req.body.desc;

	let output = `the name of the cilent is ${name},${phone} years old, ${email},${address}, ${desc} `;
      fs.writeFileSync('output.text',output)

      res.render('contact.pug');
*/
})


//Start the server

app.listen(port, ()=>{
	console.log(`server run on port no ${port}`)
});