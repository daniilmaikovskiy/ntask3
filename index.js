const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const getWeather = require('./getWeather');

const args = yargs(hideBin(process.argv)).argv;

if (args.city) {
  getWeather(args.city);
} else {
  console.log('You didn\'t input city.');
}