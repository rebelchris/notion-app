const movieContainer = document.getElementById('movie-container');
const form = document.getElementById('create-movie');
const movieTitleField = document.getElementById('movie-title');

const getMovies = async () => {
  const rest = await fetch('http://localhost:8000/movies');
  const data = await rest.json();
  return data;
};

const updateMovie = async (id, checked) => {
  await fetch(`http://localhost:8000/movie/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checked: checked }),
  });
};

const createMovie = async (title) => {
  await fetch(`http://localhost:8000/movie/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: movieTitleField.value }),
  });
};

const showMovies = async () => {
  const movies = await getMovies();

  movieContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'w-1/4 p-4';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'relative pb-[200%]';

    const image = document.createElement('img');
    image.src = movie.banner;
    image.alt = movie.name;
    image.className =
      'absolute object-cover w-full h-full rounded-lg shadow-md';
    imageDiv.appendChild(image);
    movieDiv.appendChild(imageDiv);

    const textContainerDiv = document.createElement('div');
    textContainerDiv.className = 'relative z-10 px-4 -mt-8';

    const textCardDiv = document.createElement('div');
    textCardDiv.className = 'relative p-6 bg-white rounded-lg shadow-xl';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = movie.watched;
    checkbox.addEventListener('change', (event) => {
      updateMovie(movie.id, event.currentTarget.checked);
    });
    checkbox.className = 'absolute w-5 h-5 -top-2 right-4';
    textCardDiv.appendChild(checkbox);

    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(movie.name));
    textCardDiv.appendChild(title);

    movie.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.className =
        'inline-block px-2 mr-2 text-xs font-semibold tracking-wide text-blue-800 uppercase bg-blue-200 rounded-full';
      tagSpan.appendChild(document.createTextNode(tag));
      textCardDiv.appendChild(tagSpan);
    });

    textContainerDiv.appendChild(textCardDiv);
    movieDiv.appendChild(textContainerDiv);
    movieContainer.appendChild(movieDiv);
  });
};

showMovies();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createMovie(movieTitleField.value).then((success) => {
    showMovies();
  });
  movieTitleField.value = '';
});
