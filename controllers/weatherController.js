const weatherApiKey= process.env.WEATHER_API_KEY

const axios= require('axios')
const {WEATHERAPI_BASE_URL}= require('../config/urls')

async function fetchWeather(country='Bangladesh'){
    try{
        let fetchedData= await axios.get(WEATHERAPI_BASE_URL + '/current.json', {
            params:{
                key: weatherApiKey,
                q: 'country',
                aqi: 'no'
            }
        });

        let currentWeather= fetchedData.data.current

        let weatherData= {
            'temparature': currentWeather.temp_c,
            'humidity': currentWeather.humidity,
            'typeOfWeather': currentWeather.condition.text
        }
        return weatherData;
    }
    catch{
    }
}

module.exports ={
    fetchWeather
}