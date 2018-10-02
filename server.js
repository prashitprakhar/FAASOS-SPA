const express = require('express');

const app = express();

app.use(express.static(__dirname+'/dist/FAASOS-SPA'));
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/FAASOS-SPA/index.html'));
})

app.listen(process.env.PORT || 8080)