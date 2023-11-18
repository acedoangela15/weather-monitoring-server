require('dotenv').config();

const express = require('express');
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

// middlewares
app.use(server_config.cors);

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to NodeMCU Socket API</h1>');
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('weatherData', data => {
    console.log('weatherData', data);
    // socket.emit("weatherResponse", data);

    // const { SerialPort, ReadlineParser } = require("serialport");

    // const arduinoPort = new SerialPort({ path: "COM5", baudRate: 115200 });
    // const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

    // arduinoPort.write("START_SESSION\n", (err) => {
    //   if (err) return console.error("Err Arduino:", err);

    //   parser.on("data", function (data) {
    //     try {
    //       const receivedData = JSON.parse(data); // Parse the received JSON string
    //       console.log("Received Data:", receivedData);

    //       socket.emit("weatherResponse", receivedData);
    //     } catch (error) {
    //       console.error("Error passing JSON", error);
    //     }
    //   });

    //   console.log("Success Arduino.");
    // });

    return 'Session started.';
    // res.send("Session started.");
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => console.log(`Server is running to ${PORT} port`));
