const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const port = process.env.PORT || 3000
const app = express();
 
//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname,'../template/partials')


//setup handlebar engine and view location 
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath); 

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'harsh meghani'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'harsh meghani'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title: 'Help',
       name:'harsh meghani' 
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }

    geocode(req.query.address,(error,{longtitude,latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(longtitude,latitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'surat',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
    }
    res.send({
        products:[]
    })
})


// app.get('/about',(req,res)=>{
//     res.render('about')  
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'harsh'
//     },{
//         name:"kirtan"
//     }]);
// })

/*app.get('/about',(req,res)=>{
    res.send("<h1>this is about section</h1>");
})*/

// app.get('/view-weather',(req,res)=>{
//     res.send({
//         forecast:'raning season',
//         location: 'surat'
//     });
// })

app.listen(port, ()=>{
    console.log('server is up on port '+port);
})