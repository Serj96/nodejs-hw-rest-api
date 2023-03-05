const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(
    'mongodb+srv://Alex:t1pyQI9xCylKHupl@cluster0.3sdyexh.mongodb.net/db-contacts?retryWrites=true&w=majority'
  )
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
