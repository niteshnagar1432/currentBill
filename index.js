require('dotenv').config({path:"./.env"});
const express = require('express')
const app = express()
const UserRoutes = require('./routes/user.js');

app.use('/user',UserRoutes);


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))