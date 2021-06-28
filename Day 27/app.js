/* ====================================================
  Variables
  ==================================================== */
const app = document.querySelector("#app");
const monsters = [
  {
    image: "monster1",
    text: "A yellow monster with one eye and a curly nose and tail.",
  },
  {
    image: "monster2",
    text: "A yellow monster with one eye, a peanut-shaped body, and spindly arms and legs.",
  },
  {
    image: "monster3",
    text: "A green monster with two eyes, wavy arms, and sharp teeth running down its body.",
  },
  {
    image: "monster4",
    text: "A red monster with two horns, four arms, and a glum expression.",
  },
  {
    image: "monster5",
    text: "A green monster with one eye, a glum expression, and a round body.",
  },
  {
    image: "monster6",
    text: "A green monster, with one eye and a triangular body, doing a handstand.",
  },
  { image: "monster7", text: "A purple monster with one eye and two tentacles." },
  {
    image: "monster8",
    text: "A purple monster with an egg-shaped body, two horns, and an indifferent expression.",
  },
  {
    image: "monster9",
    text: "A blue, insect-like monster with two eyes, two arms, three legs, and four wings.",
  },
  {
    image: "monster10",
    text: "A blue, blob-shaped monster with two eyes, two legs, and no arms.",
  },
  {
    image: "monster11",
    text: "A black monster with a yeti-like body and a big smile.",
  },
  { image: "sock", text: "A pair of socks." },
];

console.log(monsters);

/* ====================================================
   Functions
   ==================================================== */

/* Helpers
/* ==================================================== */
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* Library
/* ==================================================== */

/**
 * Renders the shuffled array to the target HTML element
 * @param      {object}  element        The element to render the data
 * @param      {array}   arrayToRender  The array to render
 */
function renderMonsters(element, arrayToRender) {
  element.innerHTML = arrayToRender
    .map((item) => {
      return `<img class="item" src="images/${item.image}.svg" alt="${item.text}">`;
    })
    .join("");
}

/**
 * Shuffles a copy of the orginal array ready for rendering to HTML
 * @param      {array}  arrayToShuffle  The array to shuffle
 */
function shuffleMonsters(arrayToShuffle) {
  const shuffledArray = shuffle([...arrayToShuffle]);
  renderMonsters(app, shuffledArray);
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
shuffleMonsters(monsters);
