const express= require('express');
const fs= require('fs');
const path= require('path');
const app = express();
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const port= process.env.PORT || 8000;

const mongoPath=''

//Express specific stuff

//for serving static files

// To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function, specify a mount path for the static directory, as shown below:
app.use('/static', express.static('static'));

// The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded ({extended: true}));
 
mongoose.connect('mongodb+srv://ne0gi:UVoNgR70TDmBaZ5R@registrationform.prcxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// UVoNgR70TDmBaZ5R
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected");
});

//create a data schema
const danceRegis = new mongoose.Schema( {
    name:
    {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    } ,
    desc: {
        type: String,
    }
})

const Final = new mongoose.model("Final", danceRegis);
module.exports=Final;
//Pug Specific stuff
app.set('view engine', 'pug');//set the template engine as pug
app.set('views', path.join(__dirname,'views'))//set the views directory


//End points
app.get('/',(req, res)=>{
    const params= {};
    res.status(200).render('index.pug', params);
})
app.get('/contact',(req, res)=>{
    const params= {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact',async(req, res)=>{
    try{
        const registerForm= new Final({
            name: req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            address:req.body.address,
            desc:req.body.desc

        })

        const registered = await registerForm.save();
        const params= {};
        res.status(200).render('index.pug', params);
    }
    catch(error){
        res.status(400).send(error);

    }
    
    

})
//Start the server
app.listen(port,()=>{
    console.log(`The server started successfully on port ${port}`);
})