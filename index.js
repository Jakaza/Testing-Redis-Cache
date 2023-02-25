const { createClient } = require('redis');
const redisPass = process.env['REDIS_PASS']
const weatherApi = process.env['WEATHER_API']

const client = createClient({
    password: redisPass,
    socket: {
        host: 'redis-15970.c241.us-east-1-4.ec2.cloud.redislabs.com',
        port: 15970
    }
});

const endPoint = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`;


const getCurrentWeather = async (city) =>{

  let data = await endPoint(city);

  console.log(data)

  
}

const cityName = "London";
getCurrentWeather(cityName)

