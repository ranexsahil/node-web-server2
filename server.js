const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.port || 3000;


const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res, next) => {
    console.log('yes i am rrunning')
    var date = new Date().toString();
    var log = `${date}  : ${req.method} ${req.url}`
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err) {
            console.log('Unable to log server')
        }
    })
   
    next();
})


app.use(express.static(__dirname+'/public'));

hbs.registerHelper('date', ()=> new Date().getFullYear());

app.get('/',(req,res,next) => {

    res.render('home.hbs')
   
});

app.get('/about', (req,res) => {
    res.render('about.hbs');
})


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})