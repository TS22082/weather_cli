const axios = require("axios");
const inquirer = require("inquirer");
require("dotenv").config();

const zipUrl = `https://api.openweathermap.org/data/2.5/weather?zip=95616,us&appid=${process.env.WEATHER_KEY}`;

inquirer
  .prompt([
    {
      type: "number",
      message: "Enter a zip code\n",
      name: "userInput"
    }
  ])
  .then(inquirerRes => {
    if (typeof parseInt(inquirerRes.userInput[0]) != NaN) {
      axios.get(zipUrl).then(res => {
        console.log(res.data);
      });
    }
  })
  .catch(() => {
    console.log("There was a fatal mistake");
    process.exit();
  });
