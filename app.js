const axios = require("axios");
const inquirer = require("inquirer");
require("dotenv").config();

const url = "https://api.openweathermap.org/data/2.5/weather";

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter a zip code or city, state\n",
      name: "userInput"
    }
  ])
  .then(inquirerRes => {
    if (typeof parseInt(inquirerRes.userInput[0]) != NaN) {
      const finalUrl = `${url}?zip=${inquirerRes.userInput},us&units=imperial&appid=${process.env.WEATHER_KEY}`;
      axios
        .get(finalUrl)
        .then(res => {
          const data = res.data;
          console.log(data);
        })
        .catch(() => {
          console.log("No weather information found for this zipcode");
        });
    }
  })
  .catch(() => {
    console.log("There was a fatal mistake");
    process.exit();
  });
