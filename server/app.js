const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const user = require('./routes/user.route');
const dev_db_url = 'mongodb://moblize:moblize123@ds017246.mlab.com:17246/usersapp';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const db = mongoose.connection;
const port = 1234;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', user);

app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`)
});