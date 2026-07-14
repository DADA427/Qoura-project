const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v7: uuidv4} = require('uuid');
uuidv4();


app.use(express.urlencoded({extends: true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id: uuidv4(),
        username: "Vishal",
        content: "learnig devlopment"
    },
    {
        id: uuidv4() ,
        username: "Deepika",
        content: "Advoacate Sab"
    },
    {
        id : uuidv4(),
        username: "Himani",
        content: "In content creation"
    }

];

app.get("/posts", (req,res) =>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");
});

app.post("/posts", (req,res) => {
    let {username,content}=req.body;
     let id = uuidv4();
    posts.push({id,username,content});
   
    // res.render("index.ejs",{posts});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts"); 
        
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("edit.ejs",{post});
});

app.delete("/post/:id", (req,res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");  
})

app.listen(port,() =>{
    console.log(`App is listening through the port ${port}`);
});