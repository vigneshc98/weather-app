const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');


//setup handlers engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Wather App',
        name:'vignesh'
    })
});

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'should provide address'
        })
    }
    geocode(req.query.address,(error, data)=>{
        if(error){
           return res.send({error})
        }else{
           forecast(data.lat,data.lon,data.address,(er,forecastData)=>{
               if(er){
                   return res.send({er});
               }
               
               res.send({
                   title:'Weather forecast',
                   forecast: forecastData,
                   location: data.address
               })
            //    res.render('weather',{
            //        title:'Weather forecast',
            //        forecast: forecastData,
            //        location: data.address
            //    })
           })
        }
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'vignesh'
    })
})

app.get('*',(req,res)=>{
    res.render('error');
})

app.listen(3000,()=>{
    console.log('server is up on port 3000');
})