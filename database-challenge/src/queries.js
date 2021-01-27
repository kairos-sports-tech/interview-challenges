const database = require('./database').connect();

// Some of the events in the database have titles that are empty
// Write a query that will update these events to have the title 'Untitled'
const updateMissingEventTitles = () => {
  return database.raw`
    ???
  `;
};

// Write a query that will insert a new event with the date you are taking this challenge
// Your query should also return the
const insertNewEvent = () => {
  return database.raw`
    ???
  `;
};

// We would like to know, broken down by month, and 5 minute interval, how many events have been created.
// A result row might could look something like this:
// Month   |  5 | 10 | 15 | 20 |...
// --------|----|----|----|----|---
// January |  2 |  4 |  1 |  0 |...
const eventCountByLengthByMonth = () => {
  return database.raw`
    select * from events limit 1;
  `;
};

module.exports = {
  updateMissingEventTitles,
  insertNewEvent,
  eventCountByLengthByMonth,
};
