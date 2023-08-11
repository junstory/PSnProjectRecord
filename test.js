const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';


app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(PORT,HOST,() => {
    console.log(`Server Listening on ${HOST}:${PORT}`);
})


module.exports = app;
