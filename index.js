const Redis = require("ioredis");
const axios = require('axios');
const redisPass = process.env['REDIS_PASS']
const weatherApi = process.env['WEATHER_API']
const redisHost = process.env['REDIS_HOST']

const redis = new Redis({
  port: 15970, // Redis port
  host: redisHost, // Redis host
  username: "default", // needs Redis >= 6
  password: redisPass,
  db: 0, // Defaults to 0
});

// redis.set("key", "value")
// set cache wtih expiry date
// redis.set("key","value", "EX", 60 * 60 * 24) expiry 1 Day
// redis.get("key") return promise


const endPoint = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`;


async function getCurrentWeather(city) {
  try {

    // check if weather for city has been cheched.
    let weatherCache = await redis.get(`weather:${city}`);
    if (weatherCache) {
      weatherCache = JSON.parse(weatherCache);
      weatherCache.source = "CACHE";
      return weatherCache;
    }

    let data = await axios.get(endPoint(city))
    data = await data.data
    redis.set(`weather:${city}`, JSON.stringify(data))
    data.source = "API";
    return data
  } catch (error) {
    return new Error(error)
  }
}

(async () => {

  const t0 = new Date().getTime();
  const cityName = "London";
  const cityName2 = "Pretoria";
  let weather = await getCurrentWeather(cityName2)
  const t1 = new Date().getTime();
  weather.responseTime = `${t1 - t0}ms`;
  console.log(weather);

})();





