const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine', 'hbs');


//check server log error
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

//without next , will force user back to maintenance page.
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
});

app.get('/', (req , res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        WelcomeMsg: 'Welcome to my express hbs templete',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req , res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page', 
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req , res) => {
    res.send({
        error: 'Unable to handle the request.. error'
    })
});


app.listen(port, () => {
    console.log(`Server is up..on ${port}`)
});