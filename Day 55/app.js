const Dice = (function () {
  // Default sides of the dice
  const defaults = {
    sides: 6,
    message: `You rolled a {{roll}}.`,
  };

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {String}      The first item in the shuffled array
   */
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

  function rollDice(instance) {
    // Create the side of the dice
    const sidesArray = [...new Array(instance.sides)].map(function (item, index) {
      return index + 1;
    });
    // // Randomizes the slides array
    shuffle(sidesArray);
    // // Sets the text content of the result property on on the instant
    instance.result.textContent = instance.message.replace("{{roll}}", sidesArray[0]);
  }

  /**
   * Creates an event listener and attaches it to the relevant button
   * @param      {object}  button    The button element
   * @param      {object}  settings  The settings (default + user combined)
   * @param      {object}  instance  The instance being created
   */
  function createEventListener(instance) {
    /**
     * Shuffles the dice array and use the first value
     */
    function roll() {
      rollDice(instance);
    }
    // Adds listener to relevant button
    instance.button.addEventListener("click", roll);
  }

  /**
   * The constructor object
   * @param      {string}  button_  The button to 'roll' the 'dice'
   * @param      {string}  element_ The element to render the results of the 'roll'
   * @param      {object}  options  The options passed in by the user
   */
  function Constructor(button_, element_, options) {
    // Select elements based on parameters passed
    const button = document.querySelector(button_);
    const element = document.querySelector(element_);
    // Check elements exist
    if (!button || !element)
      throw new Error("Both button and result elements must be provided");

    // Merge default and user defined values, and freeze
    const { message, sides } = { ...defaults, ...options };
    // Set the property values
    Object.defineProperties(this, {
      button: { value: button },
      message: { value: message },
      sides: { value: sides },
      result: { value: element },
    });

    // Create the event listener
    createEventListener(this);
  }

  /**
   * Roll the dice
   */
  Constructor.prototype.roll = function () {
    rollDice(this);
  };

  return Constructor;
})();

// Create a D6
const d6 = new Dice("#dice", "#result", {
  message: "Nice one, you rolled {{roll}}",
});

// Create a D20
const d20 = new Dice("#dice1", "#result", {
  message: "{{roll}}",
  sides: 20,
});
