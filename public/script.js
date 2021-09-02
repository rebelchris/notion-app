const getDataFromBackend = async () => {
  const rest = await fetch('http://localhost:8000/movies');
  const data = await rest.json();

  return data;
};

const addData = async () => {
  const data = await getDataFromBackend();

  data.forEach((value) => {
    const div = document.createElement('div');
    div.classList.add('userContainer');
    div.innerHTML = `
          <h3>${value.name}</h3>
          <p>${value.tags.join(', ')}</p>
      `;

    container.append(div);
  });
};

addData();
