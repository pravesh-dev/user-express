const express = require('express');
const app = express();
const path = require('path')
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
    res.render("index")
})


app.post('/create', async (req, res)=>{
    let {name, email, image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    });
    res.redirect('/read');
})


app.get('/read', async (req, res)=>{
    let allUser = await userModel.find();
    res.render('read', {allUser})
})

app.get('/edit/:userId', async (req, res)=>{
    let user = await userModel.findOne({_id: req.params.userId});
    res.render('edit', {user})
})

app.post('/update/:userId', async (req, res)=>{
    let {name, email, image} = req.body;
    let user = await userModel.findOneAndUpdate({name, email, image})
    res.redirect('/read')
})

app.get('/delete/:userId', async (req, res)=>{
    let deletedUser = await userModel.findOneAndDelete({_id: req.params.userId});
    res.redirect('/read')
})


const port = 3000;
app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
    console.log('http://localhost:3000/')
})