
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// FOR html serving pages
//setup static folder instead of the two routes below
app.use(express.static('public'));

/*
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'about.html'));
})
*/

app.listen(port, () => console.log(`Server is running on port:${port}`));