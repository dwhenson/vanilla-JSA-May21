/* ====================================================
  Variables
  ==================================================== */
const app = document.querySelector("#app");
const buttons = [...document.querySelectorAll("button")];
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
  {
    image: "monster7",
    text: "A purple monster with one eye and two tentacles.",
  },
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
let shuffledMonsters;
let counter = 0;
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

/**
 * Shuffles a copy of the original array ready for rendering to HTML
 * @param      {array}  arrayToShuffle  The array to shuffle
 */
function shuffleMonsters(arrayToShuffle) {
  const shuffledArray = shuffle([...arrayToShuffle]);
  shuffledMonsters = shuffledArray;
}

function playAgain(event) {
  if (event.target.id !== "play-again") return;
  shuffleMonsters(monsters);
  renderGame(app, monsters);
}

/* Library
/* ==================================================== */

/**
 * Updates the HTML if the sock was found last and the game won
 */
function won() {
  window.setTimeout(function () {
    app.innerHTML = `
      <h2 aria-live="polite">Well Done! You got all the monsters!</h2>
      <button id="play-again">Play again??</button>
      <iframe src="https://giphy.com/embed/fs5TModilUX2swyR43"
        width="480"
        height="270"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen>
      </iframe>`;
  }, 250);
}

/**
 * Increment the counter each time the sock is not found
 * If found last then call the won function
 */
function checkIfWon() {
  counter += 1;
  if (counter === monsters.length) {
    won();
  }
}

/**
 * Updates the HTML if the sock was found and the game lost
 */
function lost() {
  // Add short delay to allow user to see the sock
  window.setTimeout(function () {
    app.innerHTML = `
      <button id="play-again">Play again??</button>
      <iframe src="https://giphy.com/embed/s3qCaXmFQqJsQ"
        width="480"
        height="251"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen>
      </iframe>
      <h2 aria-live="polite">Sorry, you found the sock!</h2>`;
  }, 250);
}

/**
 * Swaps the image of the door for the image of the shuffled monster
 * @param      {object}  button  The button element
 * @param      {number}  index   The index of the button
 */
function swapImage(button, index) {
  // Create a new image element
  const image = document.createElement("image");
  // Set the content of the new element as the monster based on the clicked button's index
  image.innerHTML = `
    <img
          class="grid-item"
          src="images/${shuffledMonsters[index].image}.svg"
          alt="${shuffledMonsters[index].text}"
     >`;
  // Replace the button with the new image and its contents
  button.replaceWith(image);
  // Check if the new image is a sock and it's not the last item in the array
  // If true, call lost, otherwise check if won
  if (shuffledMonsters[index].image === "sock" && counter < monsters.length - 1) {
    lost();
  } else {
    checkIfWon();
  }
}

/**
 * Find the index of the button that was clicked
 * @param      {event}  event   The event
 */
function findButtonIndex(event) {
  if (!event.target.closest("[data-type='door']")) return;
  const button = event.target.closest("button");
  const index = button.dataset.index;
  swapImage(button, index);
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */

/**
 * Render the door images based on the monsters array length
 * @param      {object}  element  The element to render the HTML
 * @param      {array}   array    The array providing the number of items needed
 */
function renderGame(element, array) {
  element.innerHTML = `
   <h2>Click the door to reveal a monster. Try not to find the sock!</h2>
       ${array
         .map((item, index) => {
           return `
           <div class="grid-item" aria-live="polite">
             <button data-type="door" data-index="${index}">
               <img src="./images/door.svg"  alt="Door" />
             </button>
           </div>`;
         })
         .join(" ")}`;
}

// Copy and shuffle the array of monsters on page load
shuffleMonsters(monsters);
renderGame(app, monsters);
document.addEventListener("click", findButtonIndex);
document.addEventListener("click", playAgain);
