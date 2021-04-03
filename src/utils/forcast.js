const request = require('request');

const forcast = (longtitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=770ad66ce2a2ce9a0b127d0f4069e5da&query='+ latitude +','+ longtitude +'&units=m';

    request({url: url, json:true}, (error,response)=>{
        if(error){
            callback('unable to connect to service!!',undefined)
        } else if(response.body.error){
            callback('unable to find a location',undefined)
        }else{
            callback(undefined,`${response.body.current.weather_descriptions[0]} it is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`)
        }
    })     
}

module.exports = forcast


//const url = 'http://api.weatherstack.com/current?access_key=770ad66ce2a2ce9a0b127d0f4069e5da&query=37.8267,-122.4233';
// request({url : url},(error , response)=>{

//     const data = JSON.parse(response.body);
//     console.log(data.current);
// })