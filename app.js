require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000
const {fetchWeather} = require('./controllers/weatherController')
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const {calculateDistance, fetchAirports}= require('./controllers/airportController');
const { calculatePrice } = require('./controllers/orderController');


app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    const weatherData= await fetchWeather();
    const airportList= await fetchAirports();
    const queryParams=req.query;
    const from = queryParams.from
    const to= queryParams.to
    let price=0;
    if(from && to){
        price= await calculatePrice(from, to);
    }
    
    return res.render('main', {"weather": weatherData, 
    "airports": airportList,
    "from": from,
    "to": to,
    "price": price 
} );
})

app.post('/payment', )

app.listen(port, () => {
})