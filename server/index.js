const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css')); // http://localhost:3000/css
// app.use('/js', express.static(__dirname + 'public/lib')); // http://localhost:3000/js

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(port, function() {
    console.log('Server started at http://localhost:%s', port);
});