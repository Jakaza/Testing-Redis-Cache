const Redis = require("ioredis");
const axios = require('axios');
const redisPass = process.env['REDIS_PASS']
const weatherApi = process.env['WEATHER_API']

const redis = new Redis({
  port: 15970, // Redis port
  host: "redis-15970.c241.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: redisPass,
  db: 0, // Defaults to 0
});

// redis.set("mykey", "value");

redis.get("myk", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Prints "value"
  }
});


const endPoint = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`;


async function getCurrentWeather (city){
  try{

    // check if we have a cheched.
    let weather = await redis.get(`weather:${city}`);
    if(weather){
      
    }else{
      console.log()
    }
    
    let data = await axios.get(endPoint(city))
    data = await data.data
    data.source = "API";
    return data
  }catch(error){
    return new Error(error)
  }
}

(async() => {

// const t0 = new Date().getTime();
// const cityName = "London";
// let weather = await getCurrentWeather(cityName)
// const t1 = new Date().getTime();
// weather.responseTime = `${t1-t0}ms`;
// console.log(weather);

})();





