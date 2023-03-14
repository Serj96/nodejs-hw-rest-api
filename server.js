const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successful');
      console.log(PORT);
    })
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
