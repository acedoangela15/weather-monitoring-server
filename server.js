require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const server_config = require('./config');

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET'],
    transports: ['websocket', 'polling'],
  },
});

const HttpError = require('./models/http-error');
const Log = require('./models/log');

const logRoutes = require('./routes/log-routes');

// middlewares
app.use(server_config.cors);
app.use(express.urlencoded({ parameterLimit: 1000000, limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.set('json spaces', 2);

// routes
app.use('/api/log', logRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// special route to handle errors
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('weatherData', data => {
    console.log('weatherData', data);

    return 'Session started.';
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// connection to database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/weather-monitoring?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(PORT, () => console.log(`Server is running to ${PORT} port`));

    console.table({ URL: `http://localhost:${PORT}` });
    console.log('Connection Successful!');
  })
  .catch(err => {
    console.log(err);
  });
