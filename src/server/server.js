const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 8800;

app.use(morgan('dev'));
app.use((req, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});


app.use(express.static(path.join(__dirname, '..', '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://203.234.55.134:${port}/`);
});
