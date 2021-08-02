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

  /**
   * Creates an event listener and attaches it to the relevant button
   * @param      {object}  button    The button element
   * @param      {object}  settings  The settings (default + user combined)
   * @param      {object}  instance  The instance being created
   */
  function createEventListener(sides, instance) {
    // Get the properties from the instance
    const { button, message, result } = instance;
    /**
     * Shuffles the dice array and use the first value
     */
    function roll() {
      // Randomizes the slides array
      shuffle(sides);
      // Sets the text content of the _result property on on the instant
      result.textContent = message.replace("{{roll}}", sides[0]);
    }
    // Adds listener to relevant button
    button.addEventListener("click", roll);
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

    // Create the side of the dice
    const sidesArray = [...new Array(sides)].map(function (item, index) {
      return index + 1;
    });

    // Create the event listener
    createEventListener(sidesArray, this);
  }

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
