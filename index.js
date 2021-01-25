const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.options('*', cors()) // include before other routes
app.use(cors())

app.get("/", (req, res) => {
	return res.json({data: "Connected server" });
});

app.get("/ping", (req, res) => {
  return res.json({data: "pong" })
});

app.get("/health", (req, res) => {
        return res.json({status: `${process.env.APP_NAME} is running on port ${process.env.PORT}`, data: "Application healthy" });
});


app.listen(process.env.PORT || 3000);
console.log(`App listening on http://localhost:${process.env.PORT}`);
