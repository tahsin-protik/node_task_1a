const { calculateDistance } = require("./airportController");
const sequelize = require('../utils/db');
const {order} = require('../models/orderModel')
const uuid= require('uuid')

async function calculatePrice(start, destination){
    let price= await calculateDistance(start, destination);
    price= price*10;
    price= price.toFixed(2);
    return price;
}

async function createNewOrder(start, destination){
    try{
    const price = await calculatePrice(start, destination);
    const startDetails= 
    sequelize.sync();
    let newOrder= await order.create({
        id: uuid.v4(),
        total: price,

    })
    }
    catch{

    }
}

module.exports ={
    calculatePrice
}
