import express from 'express';
import AdminAuthRoute from './AdminApi/Auth';
import configMongoDB, { connection } from './Config/DBConfig'
import config from 'dotenv'
import UserController from './AdminApi/User';
import EventController from './AdminApi/Events';
import NewsController from './AdminApi/News';
import AppAuth from './App/AppAuth';
import AppEvents from './App/Events';
import AppProfile from './App/Users';
import AppNews from './App/News';
import AddFamily from './App/add_family';
import Searh from './App/search_user';
import ContentRouter from './AdminApi/Content';
import { aboutApp, ads } from './Config/tables';
import Ads from './AdminApi/Ads';
import AppContentRouter from './AdminApi/AppContent';
config.configDotenv()
const app = express();
import cors from 'cors'
import path from 'path'
// const cors = require('cors');
// const path = require('path');
const port = process.env.PORT || 8000;
console.log(port, "check")

var allowedOrigins = ['http://localhost:3000',
  'http://139.144.1.59:9999', "http://139.144.1.59"];

app.use(express.json())

// const corsOpts = {
//   origin: '*',

//   // methods: [
//   //   'GET',
//   //   'POST',
//   // ],

//   // allowedHeaders: [
//   //   'Content-Type',
//   // ],
// };
// app.use(cors(corsOpts))
const corsOptions = {
  credentials: true,
  // origin: "*"
  origin: ['http://localhost:3000', 'http://139.144.1.59'] // Whitelist the domains you want to allow
};
app.get('/data', (req, res) => {
  res.json({ message: 'This is a test response from the API.' });
});
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }))

app.listen(port, async () => {
  await configMongoDB()
});

app.get('/download-form', (req, res) => {
  const filePath = path.join(__dirname, './Form/', 'form.pdf');

  // Use the res.sendFile method to send the file
  res.sendFile(filePath, (err) => {
    if (err) {
      // Handle any errors here
      res.status(500).send('Error sending file');
    }
  });
});

app.use(AdminAuthRoute)

app.use(UserController)

app.use(EventController)

const imagesDirectory = path.join(__dirname, '../Images'); // Replace 'Images' with your image directory's name

app.use('/Images', express.static(imagesDirectory));

app.use(NewsController)

app.use(Ads)

app.use(AppAuth)

app.use(AppEvents)

app.use(AppProfile)

app.use(AppNews)

app.use(AddFamily)

app.use(ContentRouter)

app.use(Searh)

app.use(AppContentRouter)


