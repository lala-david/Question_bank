const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8800;

const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); 

function getLogFileName() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
}

app.use((req, res, next) => {
    const logFileName = getLogFileName();
    const logFilePath = path.join(logDirectory, logFileName);
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); 
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;

    console.log(logMessage);
    logStream.write(logMessage + '\n');
    logStream.end();

    next();
});

app.use(express.static(path.join(__dirname, '..', '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://203.234.55.134:${port}/`);
});
