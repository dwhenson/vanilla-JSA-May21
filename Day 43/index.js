/**
 * Get a date in the future (or past) from a timestamp
 * @return {String} A formatted date string
 */
function getFutureDate(locale = "en-US", formatOptions, timeAdjustment) {
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
  // Destructure object keys and convert user adjustment values to milliseconds
  const { hours, days, weeks, months, years } = mergedTimeFromNow;
  const adjustHours = hours * 60 * 60 * 1000;
  const adjustDays = days * 24 * 60 * 60 * 1000;
  const adjustMonths = months * 30 * 24 * 60 * 60 * 1000;
  const adjustYears = years * 12 * 30 * 24 * 60 * 60 * 1000;
  const totalAdjust = adjustHours + adjustDays + adjustMonths + adjustYears;
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
  // hours: 0,
  // days: 0,
  // weeks: 0,
  // months: 0,
  // years: 0,
};
// Function call with options
getFutureDate(locale, userFormat, userTimeFromNow);
