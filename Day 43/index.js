/**
 * Get a date in the future (or past) from a timestamp
 * @return {String} A formatted date string
 */
function getFutureDate(locale = navigator.language, formatOptions, timeAdjustment) {
  // Default format options
  const defaultFormat = {
    hour12: true,
    timeStyle: "short",
    dateStyle: "medium",
  };
  // Default time adjustments
  const defaultTimeFromNow = {
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
  };
  // Merge default and user options
  const mergedFormat = { ...defaultFormat, ...formatOptions };
  const mergedTimeFromNow = { ...defaultTimeFromNow, ...timeAdjustment };

  // Times in milliseconds
  const times = {
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30,
    years: 1000 * 60 * 60 * 24 * 365,
  };

  // Combine total user adjusted milliseconds
  const totalAdjust = Object.keys(mergedTimeFromNow).reduce(function (total, key) {
    // Make sure unit of time exists
    if (!times[key]) {
      console.log(`Sorry, "${key}" is not an accepted time value.`);
    }
    // If key is falsy skip the addition, else add the value in milliseconds
    return !times[key] ? total : total + mergedTimeFromNow[key] * times[key];
  }, 0);

  // Get timestamp when function called, adjust and return formatted result
  const timestamp = new Date().getTime();
  const adjustedDate = timestamp + totalAdjust;
  const formattedDate = new Date(adjustedDate).toLocaleString(locale, mergedFormat);
  return formattedDate; // ?
}

/* Inits
/* ==================================================== */
/* Format Options
   ---------------- */
let locale; // Options: "en-US", "fr-FR" etc.
const userFormat = {
  // hour12: true/false
  // timeStyle: short/medium/long
  // dateStyle: "short/medium/long
};
/* Time adjustment options
   ---------------- */
const userTimeFromNow = {
  seconds: 1000,
  hours: 0,
  days: 0,
  weeks: 0,
  months: 0,
  years: 0,
};
// Function call with options
getFutureDate(locale, userFormat, userTimeFromNow);
