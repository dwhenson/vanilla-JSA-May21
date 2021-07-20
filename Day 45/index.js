let stamp = (function () {
  // Times in milliseconds
  let times = {
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30,
    years: 1000 * 60 * 60 * 24 * 365,
  };

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

  function getDate(timestamp) {
    return new Date(timestamp).toLocaleString(navigator.language, {
      hour12: true,
      timeStyle: "short",
      dateStyle: "medium",
    });
  }

  return { addHours, addDays, addWeeks, addYears, getDate };
})();

let now = new Date().getTime();
let threeWeeks = stamp.addDays(now, 3);
let date = stamp.getDate(threeWeeks); //?
