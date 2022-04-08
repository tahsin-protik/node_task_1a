const API_KEY= process.env.AIRPORT_API_KEY
const axios= require('axios')
const {AIRPORT_API_BASE_URL}= require('../config/urls')

async function fetchAirports(){
    try{
        let fetchedData= await axios.get(AIRPORT_API_BASE_URL ,  {
            params:{
                api_key: API_KEY,
            }
        });
        airportList=fetchedData.data.response;

        return airportList;
    }
    catch{
    }
}

function distance(lat1, lon1, lat2, lon2){
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const totalDistance = (R * c)/1000; 

    return totalDistance;
}

async function calculateDistance(startICOACode, destinationICOACode){
    
    let start= await axios.get(AIRPORT_API_BASE_URL ,  {
        params:{
            api_key: API_KEY,
            icao_code: startICOACode
        }
    });
    start = start.data.response[0];
    let destination= await axios.get(AIRPORT_API_BASE_URL ,  {
        params:{
            api_key: API_KEY,
            icao_code: destinationICOACode
        }
    });
    destination = destination.data.response[0];
    
    const distanceFound= distance(start.lat, start.lng, destination.lat, destination.lng);


    return distanceFound;
}


module.exports ={
    calculateDistance,
    fetchAirports,
}