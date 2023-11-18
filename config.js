const cors = require("cors");

module.exports = {
  cors: cors({
    origin: "*",
    allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
};
