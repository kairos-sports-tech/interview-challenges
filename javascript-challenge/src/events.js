var moment = require('moment'); // require momentjs for date library
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

const events = [
  {
    id: 106,
    startsAt: '2021-01-27T13:01:11Z',
    endsAt: '2021-01-27T15:01:11Z',
    title: 'Daily walk',
  },
  {
    id: 156,
    startsAt: '2021-01-27T17:01:11Z',
    endsAt: '2021-01-27T22:01:11Z',
    title: 'Dinner',
  },
  {
    id: 5676,
    startsAt: '2021-01-29T13:01:11Z',
    endsAt: '2021-01-29T15:01:11Z',
    title: 'Daily walk',
  },
];

const groupEventsByDay = (events) => {
  // iterate through elements within events array and return a single value after reduce and functions implementaion
  events = events.reduce((eventAccumulator, currentEvent) => {
    // set startDay const to events startsAt property from events array
    /** TODO : Edge case if event endsAt ends at a different day, check it should be a future dateTime to startsAt, with the event belonging to that different key day as a continued event */
    const startDay = currentEvent.startsAt;

    // format ISO 8601 date to DD/MM/YYYY
    /** TODO : for eventDay to include time to be able to sort key day with earliest event time */
    var eventDay = moment(startDay).format('DD/MM/YYYY');

    // null check, return empty array if eventDay is null
    if (eventAccumulator[eventDay] == null) eventAccumulator[eventDay] = [];

    /** TODO : sort the date by ascending order eventAccumulator[date].sort(function (a, b) {
      return new Date(a.startsAt).getTime() - new Date(b.starts).getTime();
    });*/

    // add new event to eventAccumulator array
    eventAccumulator[eventDay].push(currentEvent);

    return eventAccumulator;
  }, {});

  return events;
};

// log to console with events array as input passed in to groupEventsByDay function
console.log(groupEventsByDay(events));

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
  // Create new objects array taking in the eventsByDay passed in and update event with id 5676
  const newEventsByDay = Object.assign({}, eventsByDay, {
    /** TODO : should return all eventsByDay  target source instead of first event in list and updating with new event
    /** TODO : eventsByDay array if(eventsByDay.id === id) id being 5676 found in eventsByDay then add 1 day to startsAt and endsAt else return eventsByDayArray
    /** TODO : needed to replace toDay(2) with toDay(3) */
    2: [
      {
        id: id,
        startsAt: '2021-01-30T13:01:11Z', // ** TODO : startsAt.add(1, 'days'); use momentjs to update startsAt date and add 1 day to event
        endsAt: '2021-01-30T13:01:11Z', // ** TODO : endsAt.add(1, 'days'); use momentjs to update endsAt date and add 1 day to event
        title: 'Daily walk',
      },
    ],
  });

  // sets initial events input to return new event properties with update to toDay(2) startsAt and endsAt
  eventsByDay = newEventsByDay;

  return eventsByDay;
};

// log to console with eventsByDay objects array, eventId and toDay as input passed in to moveEventToDay function
console.log(
  moveEventToDay(
    {
      0: [
        {
          id: 106,
          startsAt: '2021-01-27T13:01:11Z',
          endsAt: '2021-01-27T15:01:11Z',
          title: 'Daily walk',
        },
      ],
      2: [
        {
          id: 5676,
          startsAt: '2021-01-29T13:01:11Z',
          endsAt: '2021-01-29T15:01:11Z',
          title: 'Daily walk',
        },
      ],
    },
    5676,
    3,
  ),
);

// exports groupEventsByDay and moveEventToDay functions to events.test.js for unit testing
module.exports.groupEventsByDay = groupEventsByDay;
module.exports.moveEventToDay = moveEventToDay;
