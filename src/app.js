const express = require("express");

// static path require
const path = require("path");
//now we require database file\
require("./db/conn")
//now we call save  method to save data after creating schema
const User = require("./models/usermessage")
const hbs = require("hbs");
const app = express();


//for server and local port
const port = process.env.PORT || 3000;

//setting the path that the access
const staticpath =  path.join(__dirname, "../public"); 
const templatespath =  path.join(__dirname, "../templates/views"); 
const partialspath =  path.join(__dirname, "../templates/partials"); 
//console.log(path.join(__dirname, "../public"));

/////////////////////////

// use this line for creating static web site middelware

// for bootstrap file ko access without cdn links
app.use('/css',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname, "../node_modules/jquery/dist")));

//now we get data json format in data base
app.use(express.urlencoded({extended:false}))


// use this line for creating static web site middelware 
app.use(express.static(staticpath))

// now we acces the veiw engin
app.set("view engine","hbs");
//now we set templates and partials folder
app.set("views",templatespath);
// now access partials folder
hbs.registerPartials(partialspath)
/// hbs file or pages accesss handling access
app.get("/",(req, res)=>{
res.render("index");

})
// app.get("/contact",(req, res)=>{
//     res.render("contact")

// })

// after that user jb data enter kra ga to contact wala rout ma jaya ga
app.post("/contact", async(req,res) => {

    try {
        //ya line browser and post man k lyya ha 
        //res.send(req.body);
        //now we creating data and store data in data base
         const userData = new User(req.body);
         await userData.save();
         res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
        
    }

})

// /// routing connection
// app.get("/",(req, res)=>{
//     res.send("Hy how are you")

// })

// Create server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
