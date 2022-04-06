const express = require('express');
const cookieParser = require('cookie-parser');
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
require('dotenv').config();




const routes = require("./Routes/routes");


app.use(routes);

app.listen(4000,() => console.log("Listening for requests on port 4000..."));