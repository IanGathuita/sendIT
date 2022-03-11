const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
require('dotenv').config();
app.get('/',(req,res) => {
    console.log('/ invoked');
    res.send('got /');
});
const routes = require("./Routes/routes");


app.use(routes);

app.listen(4000,() => console.log("Listening for requests on port 4000..."));