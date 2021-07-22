/**
 * Adds user defined units of time to an original time, and formats the result
 * @return     {objects}  Values from utility functions
 */
const Stamp = (function () {
  const timestamp = new Date().getTime();
  const defaultNumber = 1;

  function Constructor(number) {
    this.number = this.number = number ? number : defaultNumber;
  }

  Constructor.prototype.times = {
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30,
    years: 1000 * 60 * 60 * 24 * 365,
  };

  /**
   * Adds a number of units of time to a timestamp
   * @param      {number}  timestamp  The timestamp
   * @param      {number}  number     The number of units to add
   * @return     {number}  The combined timestamp and units * milliseconds
   */
  Constructor.prototype.addHours = function () {
    return timestamp + this.number * this.times.hours;
  };
  Constructor.prototype.addDays = function () {
    return timestamp + this.number * this.times.days;
  };
  Constructor.prototype.addWeeks = function () {
    return timestamp + this.number * this.times.weeks;
  };
  Constructor.prototype.addYears = function () {
    return timestamp + this.number * this.times.years;
  };

  /**
   * Converts timestamp from ms to default or user defined date formats
   * @param      {number}  timestamp     The timestamp
   * @param      {object}  [options={}]  The user options
   * @return     {string}    The date as a string
   */
  Constructor.prototype.formatTimestamp = function () {
    const defaults = {
      hour12: true,
      timeStyle: "short",
      dateStyle: "medium",
    };
    // const format = { ...defaults, ...options };
    return new Date(timestamp).toLocaleString(navigator.language, defaults);
  };

  return Constructor;
})();

const now = new Stamp(); // ?
const inTwoWeeks = now.addWeeks(2); // ? 60480022
const inTwoWeeksDate = new Stamp(inTwoWeeks).formatTimestamp(); // ?
