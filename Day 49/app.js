/**
 * Adds user defined units of time to an original time, and formats the result
 * @return     {objects}  Values from utility functions
 */
const Stamp = (function () {
  /**
   * The Constructor object
   * @param      {Integer|String|Date}  timestamp  The timestamp
   */
  function Constructor(date) {
    this.timestamp = new Date(date).getTime() || Date.now();
    this.timeAdjust = 0;
  }

  /**
   * Times in milliseconds
   */
  const times = {
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

  // Constructor.prototype.addHours = function (number = 1) {
  //   return this.timestamp + number * times.hours;
  // };
  // Constructor.prototype.addDays = function (number = 1) {
  //   return this.timestamp + number * times.days;
  // };
  Constructor.prototype.addWeeks = function (number = 1) {
    this.timeAdjust += this.timestamp + number * times.weeks;
    return this; // ?
  };
  Constructor.prototype.addYears = function (number = 1) {
    this.timeAdjust += this.timestamp + number * times.years;
    return this; // ?
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
    return new Date(this.timestamp + this.timeAdjust).toLocaleString(
      navigator.language,
      defaults
    );
  };

  return Constructor;
})();
const now = new Stamp(); // ?
const timeAdjust = now.addYears(10); // works with single value but fails on chaining
const adjustedDate = new Stamp(timeAdjust.timeAdjust).formatTimestamp(); // ?
