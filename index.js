require('dotenv').config({path:"./.env"});
const express = require('express')
const morgan = require('morgan');
const app = express()
const UserRoutes = require('./routes/user.js');
require( './models/config.js');
require('./models/UserModel.js');

app.use(morgan('tiny'));
app.use('/user',UserRoutes);

app.get('*',(req,res)=>{
    res.json({status:false,message:'route not found.'});
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))