const express = require('express');
const { getDatabase, toggleMovie, createMovie } = require('./modules/notion');

const port = 8000;
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/movies', async (req, res) => {
  const movies = await getDatabase();
  res.json(movies);
});

app.put('/movie/:id', async (req, res) => {
  await toggleMovie(req.params.id, req.body.checked);
  res.json('done');
});

app.post('/movie', async (req, res) => {
  await createMovie(req.body.title);
  res.json('done');
});

app.listen(port, console.log(`Server started on ${port}`));
