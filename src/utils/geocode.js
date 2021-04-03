const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyc2g0NyIsImEiOiJja215dXk4YWgwN3FsMnRwZnc4N2lyZmJ6In0.AaYVnonk_P8DaP2hMzyahw&limit=1';

    request({url, json: true},(error,{body})=>{
        if(error){
            callback('unable to connect location service', undefined);
        } else if(body.features.length === 0){
            callback('unable to find location, try another search', undefined);
        } else{
            callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


// request({url : url , json: true},(error , response)=>{
//     //console.log(response.body.current);

//     if(error){
//         console.log("unable to connect weather service !");
//     }else if(response.body.error){
//         console.log("unable to find a location");
//     }else{
//         console.log(`${response.body.current.weather_descriptions[0]} it is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`);
//     }
//    // console.log(`${response.body.current.weather_descriptions[0]} it is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`);
// })

// const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGFyc2g0NyIsImEiOiJja215dXk4YWgwN3FsMnRwZnc4N2lyZmJ6In0.AaYVnonk_P8DaP2hMzyahw&limit=1';

// request({url:geourl , json:true},(error,response)=>{
//     const longtitude = response.body.features[0].center[0]; 
//     const latitude = response.body.features[0].center[1];
//     console.log(longtitude,latitude);
// })