const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route for all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// SSL configuration
let sslOptions = null;
if (process.env.NODE_ENV === 'production') {
    sslOptions = {
        key: fs.readFileSync('/ssl/key.pem'),
        cert: fs.readFileSync('/ssl/cert.pem')
    };
}

// Start the server
if (sslOptions) {
    const HTTP_PORT = 80;
    http.createServer((req, res) => {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(HTTP_PORT);

    const HTTPS_PORT = 443;
    https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
        console.log(`HTTPS server listening on port ${HTTPS_PORT}`);
    });
} else {
    const DEV_PORT = 3000;
    http.createServer(app).listen(DEV_PORT, () => {
        console.log(`HTTP server listening on port ${DEV_PORT}`);
    });
}