const http = require('http');

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

const getWeather = (query = '') => {
  const url = `${API_URL}/current?access_key=${API_KEY}&query=${query}`;

  console.log('loading...\n');

  http.get(url, (res) => {
    const statusCode = res.statusCode;

    if (!API_KEY) {
      console.error(`Error: Check your API_KEY`);
      console.log('\ndone');
      return;
    }
    
    if (statusCode !== 200) {
      console.error(`Status Code: ${statusCode}`);
      console.log('\ndone');
      return;
    }

    res.setEncoding('utf8');

    let rawData = '';
    
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      const parsedData = JSON.parse(rawData);

      console.log(`Current temperature in ${parsedData.location.name} is ${parsedData.current.temperature}℃`);
      console.log('\ndone');
    });
  }).on('error', (evt) => {
    console.error(`Got error: ${evt.message}`);
  });
};

module.exports = getWeather;