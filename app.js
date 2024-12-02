const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const Port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', userRoutes);



app.listen(Port, ()=>{
    console.log(`Server is running on ${Port}.`);
})


