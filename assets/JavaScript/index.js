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
const limitInput = document.querySelector('#limit');
const offsetInput = document.querySelector('#offset');
const ratingInput = document.querySelector('#rating');
const dataList = document.querySelector('#languages');
let limit = 10;
let offset = 0;
let q = '';
let rating = '';
// Gets all topics
const getTopics = () => topics.map((topic) => createBtn(topic));

// create a btn for each topic in array
const createBtn = (topic) => {
  const btn = document.createElement('button');
  btn.id = topic;
  btn.className = 'giphyButton';
  btn.textContent = topic;
  btn.addEventListener('click', (e) => {
    q = e.target.id;
    getGiphys(q, limit);
    while (giphyGroup.firstChild) {
      //The list is LIVE so it will re-index each call
      giphyGroup.removeChild(giphyGroup.firstChild);
    }
  });
  buttonGroup.appendChild(btn);
};

// Loads all buttons when page loads
document.onload = getTopics();

// Create new topic
const createTopic = (topic) => {
  topics.push(topic);
  createBtn(topic);
};

// Event listener for button to add another topic from search bar
addTopicBtn.addEventListener('click', () => createTopic(searchInput.value));

// FETCH
const getGiphys = () => {
  const endpoint = 'search';
  const key = 'q8DYV0M8eXqbtdQxXfnOJHMbFjtuG0Gz';
  fetch(
    `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${key}&q=${q}&limit=${limit}&offset=${offset}&rating=${rating}`
  )
    .then((res) => res.json())
    .then((data) => displayGiphys(data.data))
    .catch((err) => console.log(err));
};

// function to display giphs
const displayGiphys = (giphs) => {
  giphs.map((giph) => {
    const looping = giph.images.original.url;
    const still = giph.images.original_still.url;
    const newImg = document.createElement('img');

    newImg.id = giph.id;
    newImg.src = still;
    newImg.className = 'images';
    newImg.addEventListener('click', (e) => {
      if (e.target.src === still) {
        e.target.setAttribute('src', looping);
      } else {
        e.target.setAttribute('src', still);
      }
    });
    giphyGroup.appendChild(newImg);
  });
};

// change limit
limitInput.addEventListener('change', (e) => {
  limit = e.target.value;
});
offsetInput.addEventListener('change', (e) => {
  offset = e.target.value;
});
ratingInput.addEventListener('change', (e) => {
  rating = e.target.value;
});
