const differenceInDays = require('date-fns/differenceInDays');
const format = require('date-fns/format');
const addDays = require('date-fns/addDays');
/**
  An event could look like this:
  ```
  {
    id: 107,
    startsAt: '2021-01-27T13:01:11Z',
    endsAt: '2021-01-27T15:01:11Z',
    title: 'Daily walk',
  }
  ```
*/

/**
  Take an array of events and return an object that is a  mapping from the 'day' to the events occuring on that day.
  The keys should be the day-difference to the earliest occuring event.
  Each days events should be sorted in ascending order of startsAt

  A result could look like:
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
      { id: 156, startsAt: '2021-01-27T17:01:11Z',  endsAt: '2021-01-27T22:01:11Z',  title: 'Dinner' },
    ],
    2: [
      { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-29T15:01:11Z',  title: 'Daily walk' },
    ]
  }
 ```

 Your solution should not modify any of the function arguments
*/
const groupEventsByDay = (events) => {
  if (!Array.isArray(events)) {
    throw new Error(
      `Events argument should be of type array, ${typeof events} given!`,
    );
  }

  // Create local copy to carry out modifications on
  const copiedEvents = JSON.parse(JSON.stringify(events));

  const eventsGroupedByStartsAt = copiedEvents.reduce(
    (normalizedEventsObject, nextEvent) => {
      const formattedDateKey = format(
        new Date(nextEvent.startsAt),
        'yyyy-MM-dd',
      );

      if (formattedDateKey in normalizedEventsObject) {
        normalizedEventsObject[formattedDateKey].push(nextEvent);
      } else {
        normalizedEventsObject[formattedDateKey] = [nextEvent];
      }

      return normalizedEventsObject;
    },
    {},
  );

  for (let key in eventsGroupedByStartsAt) {
    eventsGroupedByStartsAt[key].sort(startsAtCompareFunction);
  }

  const eventsGroupedByStartsAtWithTransformedKey = Object.values(
    eventsGroupedByStartsAt,
  ).reduce(
    // The _ represents the index of the next element
    (eventsGroup, nextEventsArray, _, initialArray) => {
      eventsGroup[
        differenceInDays(
          new Date(nextEventsArray[0].startsAt),
          new Date(initialArray[0][0].startsAt),
        )
      ] = nextEventsArray;
      return eventsGroup;
    },
    {},
  );

  return eventsGroupedByStartsAtWithTransformedKey;
};

/**
  Adjust the start and end date of an event so it maintains its total duration, but is moved `toDay`.
  `eventsByDay` should be the same as the return value of `groupEventsByDay`
  `id` will be the event that should be moved
  `toDay` will be a number that indicates the key of `eventsByDay` that the target event should be moved to

  Example:
  ```
  moveEventToDay(
    {
      0: [
        { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
      ],
      2: [
        { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-29T15:01:11Z',  title: 'Daily walk' },
      ]
    },
    5676,
    3,
  )
  ```
  Should return something like
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
    ],
    3: [
      { id: 5676, startsAt: '2021-01-30T13:01:11Z',  endsAt: '2021-01-30T15:01:11Z',  title: 'Daily walk' },
    ]
  },
  ```

  Your solution should not modify any of the function arguments
*/
const moveEventToDay = (eventsByDay, id, toDay) => {
  // Create local copy to carry out modifications on
  const copiedEventsByDay = JSON.parse(JSON.stringify(eventsByDay));
  let foundEvent;

  for (let key in copiedEventsByDay) {
    foundEvent = copiedEventsByDay[key].find((event) => event.id === id);
    if (foundEvent) {
      copiedEventsByDay[key] = copiedEventsByDay[key].filter(
        (ev) => ev.id !== id,
      );
      break; // Exit early once event in question is found
    } else {
      return `Event with ID ${id} does not exist`;
    }
  }
  foundEvent.startsAt = addDays(new Date(foundEvent.startsAt), toDay);
  foundEvent.endsAt = addDays(new Date(foundEvent.endsAt), toDay);
  copiedEventsByDay[toDay] = copiedEventsByDay[toDay]
    ? copiedEventsByDay[toDay].concat([foundEvent])
    : [foundEvent];
  return copiedEventsByDay;
};

/**
 * Date comparism function
 * Takes two events as arguments, returns them in ascending order
 */
const startsAtCompareFunction = (eventA, eventB) => {
  const dateA = new Date(eventA.startsAt);
  const dateB = new Date(eventB.startsAt);
  return dateA - dateB;
};

module.exports = {
  groupEventsByDay,
  moveEventToDay,
};
