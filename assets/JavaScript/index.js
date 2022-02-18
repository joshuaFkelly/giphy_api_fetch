// Variables
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
let query;

// maps topics to page
const getTopics = () => topics.map((topic) => createBtn(topic));

// create a btn for each topic in array
const createBtn = (topic) => {
  const btn = document.createElement('button');
  btn.id = topic;
  btn.className = 'giphyButton';
  btn.textContent = topic;
  btn.addEventListener('click', (e) => {
    query = e.target.id;
    processGetRequest();
    while (giphyGroup.firstChild) {
      //The list is LIVE so it will re-index each call
      giphyGroup.removeChild(giphyGroup.firstChild);
    }
  });
  buttonGroup.appendChild(btn);
};

// automatically load topics when document loads
document.onload = getTopics();

// This function changes the URL baesd on client input
const searchParams = () => {
  const requestObj = {
    API_KEY: 'q8DYV0M8eXqbtdQxXfnOJHMbFjtuG0Gz',
    endpoint: 'search',
    limit: limitInput.value,
    offset: offsetInput.value,
    q: query,
    rating: ratingInput.value,
  };
  return requestObj;
};

// This function takes data from searchParams() and modifys the URL
const buildURL = (requestData) => {
  return `https://api.giphy.com/v1/gifs/${requestData.endpoint}?api_key=${requestData.API_KEY}&q=${requestData.q}&limit=${requestData.limit}&offset=${requestData.offset}&rating=${requestData.rating}`;
};

// This is our async fetch() function. URL is provided by buildURL()
const getGiphys = async (URL) => {
  const response = await fetch(URL);
  const jsonResponse = await response.json();
  // giphy data
  const giphys = jsonResponse.data;
  displayGiphys(giphys);
};

// saves searchParams() data to a variable to be passed as an arg to buildURL() we then wait for getGiphys() request pasing the fully built URL as an arg
const processGetRequest = async () => {
  const requestData = searchParams();
  const requestURL = buildURL(requestData);
  await getGiphys(requestURL);
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
