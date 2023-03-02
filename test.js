const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://Alex:t1pyQI9xCylKHupl@cluster0.3sdyexh.mongodb.net/db-contacts?retryWrites=true&w=majority'
  )
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
const payload = { id: 123, name: 'Max' };
const secret = 'world';
const token = jwt.sign(payload, secret);
const verify = jwt.verify(token, secret);

console.log(token);
console.log(verify);
