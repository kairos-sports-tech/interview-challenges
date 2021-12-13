const eventsFunction = require('./events'); // import groupEventsByDay function
const moment = require('moment'); // require momentjs for date library

describe('events function unit tests', () => {
  describe('groupEventsByDay function', () => {
    test('should return events with the day as a key, with all events occuring on that key day', () => {
      const events = [
        {
          id: 5676,
          startsAt: '2021-01-29T13:01:11Z',
          endsAt: '2021-01-29T15:01:11Z',
          title: 'Daily walk',
        },
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
          id: 157,
          startsAt: '2021-01-27T22:01:11Z',
          endsAt: '2021-01-27T23:01:11Z',
          title: 'Dinner',
        },
      ];

      expect(eventsFunction.groupEventsByDay(events)).toEqual({
        '29/01/2021': [
          {
            id: 5676,
            startsAt: '2021-01-29T13:01:11Z',
            endsAt: '2021-01-29T15:01:11Z',
            title: 'Daily walk',
          },
        ],
        '27/01/2021': [
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
            id: 157,
            startsAt: '2021-01-27T22:01:11Z',
            endsAt: '2021-01-27T23:01:11Z',
            title: 'Dinner',
          },
        ],
      });
    });

    test('should return date format to be DD/MM/YYYY when momentjs formats inputted date from ISO', () => {
      const event = {
        id: 5676,
        startsAt: '2021-01-29T13:01:11Z',
        endsAt: '2021-01-29T15:01:11Z',
        title: 'Daily walk',
      };

      const eventDay = moment(event.startsAt).format('DD/MM/YYYY');

      expect(eventDay).toEqual('29/01/2021');
    });
  });

  describe('moveEventToDay function', () => {
    test('should update event id 5676 with startsAt and endsAt properties by 1 day', () => {
      // declaring mockdata to pass into moveEventToDay function arguments
      const eventsByDay = {
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
      };
      const id = 5676;
      const today = 3;

      expect(eventsFunction.moveEventToDay(eventsByDay, id, today)).toEqual({
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
            startsAt: '2021-01-30T13:01:11Z',
            endsAt: '2021-01-30T13:01:11Z',
            title: 'Daily walk',
          },
        ],
      });
    });
  });
});
