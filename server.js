const express = require('express');
const { getDatabase } = require('./modules/notion');

const port = 8000;
const app = express();

app.use(express.static('public'));

app.get('/movies', async (req, res) => {
  const movies = await getDatabase();
  res.json(movies);
});

app.listen(port, console.log(`Server started on ${port}`));
