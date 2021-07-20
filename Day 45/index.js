/**
 * Adds user defined units of time to an orginal time, and formats the result
 * @return     {objects}  Values from utility functions
 */
let stamp = (function () {
  // Times in milliseconds
  let times = {
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30,
    years: 1000 * 60 * 60 * 24 * 365,
  };

  /**
   * Adds a number of units of time to a timestap
   * @param      {number}  timestamp  The timestamp
   * @param      {number}  number     The number of units to add
   * @return     {number}  The combined timestamp and units * milliseconds
   */
  function addHours(timestamp, number) {
    return timestamp + number * times.hours;
  }
  function addDays(timestamp, number) {
    return timestamp + number * times.days;
  }
  function addWeeks(timestamp, number) {
    return timestamp + number * times.weeks;
  }
  function addYears(timestamp, number) {
    return timestamp + number * times.years;
  }

  /**
   * Formats a timestamp and returns a formated date
   * @param      {number}  timestamp  The timestamp
   * @return     {string}    The formatted date string
   */
  function getDate(timestamp) {
    return new Date(timestamp).toLocaleString(navigator.language, {
      hour12: true,
      timeStyle: "short",
      dateStyle: "medium",
    });
  }

  return { addHours, addDays, addWeeks, addYears, getDate };
})();

/* Inits
/* ==================================================== */

let now = new Date().getTime();
let threeWeeks = stamp.addDays(now, 3);
let date = stamp.getDate(threeWeeks); //?
