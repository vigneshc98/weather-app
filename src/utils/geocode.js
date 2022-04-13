const request=  require('postman-request');

const getWeather = (place,callback)=>{
    const openWeather_geocode_url2 =`https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=2765d1c9de7c5d050497317cea0c624b`
    
    request({'url':openWeather_geocode_url2, json:true},(error, response)=>{
        
        if(error){
            callback('unable to connect to openweather.com',undefined)
        }else if(response.body.cod || response.body.length==0){
            callback('unable to find location',undefined)
        }else{
            const data = { 
                lat:response.body[0].lat,
                lon:response.body[0].lon,
                address: response.body[0].name+','+response.body[0].state+','+response.body[0].country
            }
            callback(undefined,data)
        }
    })
}

module.exports=getWeather;