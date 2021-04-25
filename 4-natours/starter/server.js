/* eslint-disable prettier/prettier */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
