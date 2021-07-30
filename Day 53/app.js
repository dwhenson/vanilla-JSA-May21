const Dice = (function () {
  // Sides of the dice
  const sides = [1, 2, 3, 4, 5, 6];

  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  function createEventListener(button, instance) {
    /**
     * Shuffles the dice array and use the first value
     */
    function roll() {
      // Randomizes the slides array
      shuffle(sides);
      // Sets the text content of the _result property on on the instant
      instance._result.textContent = `You rolled a ${sides[0]}`;
    }
    // Adds listener to relevant button
    button.addEventListener("click", roll);
  }

  /**
   * The constructor object
   * @class      Constructor (name)
   * @param      {string}  button_  The button to 'roll' the 'dice'
   * @param      {string}  element+  The element to render the results of the 'roll'
   */
  function Constructor(button_, element_) {
    // Select elements based on parameters passed
    const button = document.querySelector(button_);
    const element = document.querySelector(element_);
    if (!button || !element) throw "Both button and result elements must be provided";
    // Create the event listener
    createEventListener(button, this);
    // Set the property values
    Object.defineProperties(this, {
      _result: { value: element },
    });
  }

  return Constructor;
})();

const dice = new Dice("#dice", "#result");
const dice1 = new Dice("#dice1", "#result1");
