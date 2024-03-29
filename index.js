require('dotenv').config({path:"./.env"});
const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const app = express()
const UserRoutes = require('./routes/user.js');
const BankRoutes = require('./routes/bank.js');
const BillRoutes = require('./routes/bills.js');
const ActivityRoutes = require('./routes/activity.js');
require( './models/config.js');
require('./models/UserModel.js');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/user',UserRoutes);
app.use('/bank',BankRoutes);
app.use('/bill',BillRoutes);
app.use('/activity',ActivityRoutes);

app.get('*',(req,res)=>{
    res.json({status:false,message:'route not found.'});
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))