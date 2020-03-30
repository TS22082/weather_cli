const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config();

const url = 'https://api.openweathermap.org/data/2.5/weather';

function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Get Weather', 'Quit'],
        name: 'menuChoice'
      }
    ])
    .then(inquirerResponse => {
      if (inquirerResponse.menuChoice === 'Get Weather') {
        getZip();
      } else {
        process.exit(0);
      }
    });
}
function getZip() {
  inquirer
    .prompt([
      {
        type: 'number',
        message: 'Enter a zip code',
        name: 'userInput'
      }
    ])
    .then(inquirerRes => {
      if (typeof parseInt(inquirerRes.userInput[0]) != NaN) {
        const finalUrl = `${url}?zip=${inquirerRes.userInput},us&units=imperial&appid=${process.env.WEATHER_KEY}`;
        axios
          .get(finalUrl)
          .then(res => {
            const data = res.data;

            const tableData = {};
            for (item in data.main) {
              switch (item) {
                case 'pressure':
                  tableData[item] = data.main[item] + 'mbar';
                  break;
                case 'humidity':
                  tableData[item] = data.main[item] + 'ah';
                  break;
                default:
                  tableData[item] = data.main[item] + 'F°';
                  break;
              }
            }

            console.table(tableData);
            mainMenu();
          })
          .catch(() => {
            console.log('No weather information found for this zipcode');
            mainMenu();
          });
      }
    })
    .catch(() => {
      console.log('There was a fatal mistake');
      process.exit();
    });
}

mainMenu();
