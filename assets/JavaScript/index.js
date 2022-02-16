const topics = [
  'Naruto',
  'CowBoy Bebop',
  'Dragon Ball Z',
  'Dragon Ball Super',
  'Attack on Titan',
  'Inuyasha',
  'Dragon Ball GT',
  'Howls Moving Castle',
  'Spirited Away',
  'Seven Deadly Sins',
  'Death Note',
  'Black Butler',
  'Evangelion',
  'Full Metal Alchemist',
];
const buttonGroup = document.querySelector('#buttonGroup');
const addTopicBtn = document.querySelector('#addTopicBtn');
const searchInput = document.querySelector('#search');
const giphyGroup = document.querySelector('#giphyGroup');
// Gets all topics, turn them to buttons, displays to buttongroup div
const getTopics = () => {
  setTimeout(() => {
    let output = '';
    topics.forEach((topic, id) => {
      output += `<button id="${topic}" class="giphyButton">${topic}</button>`;
    });
    buttonGroup.innerHTML = output;
    document.querySelectorAll('.giphyButton').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const q = e.target.id;
        getGiphys(q);
      });
    });
  }, 500);
};

// Loads all buttons when page loads
getTopics();

// Create new topic
const createTopic = (topic) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      topics.push(topic);

      const error = false;

      if (!error) {
        resolve();
      } else {
        reject('Error: Something went wrong');
      }
    }, 1000);
  });
};

// Add new topic event listener
addTopicBtn.addEventListener('click', () => {
  createTopic(searchInput.value)
    .then(getTopics)
    .catch((err) => {
      console.log(err);
    });
});

// fetch API to GIPHY

const getGiphys = (q) => {
  const endpoint = 'search';
  const key = 'q8DYV0M8eXqbtdQxXfnOJHMbFjtuG0Gz';
  //   const q = "inuyasha"
  const limit = 10;
  const offset = 0;
  const rating = '';
  const lang = 'en';
  fetch(
    `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${key}&q=${q}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const giphs = data.data;
      displayGiphys(giphs);
    })
    .catch((err) => {
      console.log(err);
    });
};
const displayGiphys = (giphs) => {
  let output = '';
  giphs.forEach((giph) => {
    output += `<img id=${giph.id} src=${giph.images.original_still.url}>`;
  });
  giphyGroup.innerHTML = output;
};
