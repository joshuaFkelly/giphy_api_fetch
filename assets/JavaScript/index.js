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

// Gets all topics, turn them to buttons, displays to buttongroup div
const getTopics = () => {
  setTimeout(() => {
    let output = '';
    topics.forEach((topic, id) => {
      output += `<button id="${id}">${topic}</button>`;
    });
    buttonGroup.innerHTML = output;
  }, 1000);
};

// Loads all buttons when page loads
document.onload = getTopics();

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
    }, 2000);
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
