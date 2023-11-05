import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//for hiding API key
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env);

const app = express();
const port= process.env.PORT || 3000;
const API_URL = "http://api.weatherstack.com";
const apiKey = process.env.API_KEY;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",async (req,res)=>{
    try{
    const response = await axios.get(API_URL + "/current", {
        params:{
            access_key: apiKey,
            query: "Madhya Pradesh",
            units: 'm'
        }});
        console.log(req.body.value) ;
    const result = response.data;
    console.log(result);
    // console.log(result.request.query);
    res.render("index.ejs",{
        imageURL: result.current.weather_icons,
        currentTemp: result.current.temperature,
        description: result.current.weather_descriptions,
        observationTime: result.current.observation_time,
        dayNight: result.current.is_day,
        location: result.request.query,

        windSpeed: result.current.wind_speed,
        windDirection: result.current.wind_dir,
        windDegree: result.current.wind_degree,

        Humidity: result.current.humidity,

        feelsLike: result.current.feelslike,

        Pressure: result.current.pressure,
        Visibility: result.current.visibility,
        uvIndex: result.current.uv_index,
        precipitation: result.current.precip,
        cloudCover: result.current.cloudcover,
    });
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
})

app.post("/submit",async (req,res)=>{
    // console.log(req.body.area);
    try{
        const response = await axios.get(API_URL + "/current", {
            params:{
                access_key: apiKey,
                query: req.body.area,
                units: 'm'
            }});
            console.log(req.body.value) ;
        const result = response.data;
        console.log(result);
        // console.log(result.request.query);
        res.render("index.ejs",{
            imageURL: result.current.weather_icons,
            currentTemp: result.current.temperature,
            description: result.current.weather_descriptions,
            observationTime: result.current.observation_time,
            dayNight: result.current.is_day,
            location: result.request.query,

            windSpeed: result.current.wind_speed,
            windDirection: result.current.wind_dir,
            windDegree: result.current.wind_degree,

            Humidity: result.current.humidity,

            feelsLike: result.current.feelslike,

            Pressure: result.current.pressure,
            Visibility: result.current.visibility,
            uvIndex: result.current.uv_index,
            precipitation: result.current.precip,
            cloudCover: result.current.cloudcover,
        });
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
})

app.listen(port,()=>{
    console.log(`Listening on the port ${port}`)
})

