const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router/index');
const mongoose = require('mongoose');
const app = express();
dotenv.config();
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(cors())

router(app);



mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
    .then((res) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(`your error :${err}`);
    });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Connect to port ", PORT);
})