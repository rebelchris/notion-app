const movieContainer = document.getElementById('movie-container');

const getMovies = async () => {
  const rest = await fetch('http://localhost:8000/movies');
  const data = await rest.json();
  return data;
};

const showMovies = async () => {
  const movies = await getMovies();

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
    textCardDiv.className = 'p-6 bg-white rounded-lg shadow-xl';

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
