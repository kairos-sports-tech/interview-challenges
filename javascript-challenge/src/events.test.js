const { groupEventsByDay, moveEventToDay } = require('./events');
const { validEventsData } = require('./test-data');

describe('The groupEventsByDay function', () => {
  const stringifiedEventsDataBeforeFunctionCall = JSON.stringify([
    ...validEventsData,
  ]);
  const result = groupEventsByDay(validEventsData);
  const allKeysOfResult = Object.keys(result).map((item) => +item);

  it('Groups the events by day started, the key for each group being a number', () => {
    expect(allKeysOfResult.every((el) => typeof el === 'number')).toBeTruthy();
  });

  it('Preserves all events initially supplied', () => {
    expect(Object.values(result).flat().length).toEqual(validEventsData.length);
  });

  it('Throws an error when invalid events data is supplied to the function', () => {
    expect(() =>
      groupEventsByDay('My events').toThrow(
        'Events argument should be of type array, string given!',
      ),
    );
  });

  it('Does not alter the initial function argument(s)', () => {
    expect(JSON.stringify(validEventsData)).not.toEqual(JSON.stringify(result));
  });

  it('Does not change the overall data initially supplied', () => {
    expect(stringifiedEventsDataBeforeFunctionCall).toEqual(
      JSON.stringify(validEventsData),
    );
  });
});

describe('The moveEventToDay function', () => {
  const groupedEventsByDay = groupEventsByDay(validEventsData);
  const numberofEventsGroupedByDay = Object.values(groupedEventsByDay).flat()
    .length;

  const resultOfEventMoveOperation = moveEventToDay(groupedEventsByDay, 107, 4);
  const numberofEventsInEventsMovedData = Object.values(
    resultOfEventMoveOperation,
  ).flat().length;

  it('Preserves the data inputed, only moves affected data elsewhere', () => {
    expect(numberofEventsGroupedByDay).toEqual(numberofEventsInEventsMovedData);
  });

  it('Removes the affected event from where it was initially located', () => {
    const arrayOfGroupsBeforeFunctionCall = Object.values(groupedEventsByDay);
    const arrayOfGroupsAfterFunctionCall = Object.values(
      resultOfEventMoveOperation,
    );

    // Checking for length of first array because event with ID of 107 belongs to first array
    expect(arrayOfGroupsBeforeFunctionCall[0].length).not.toBe(
      arrayOfGroupsAfterFunctionCall[0].length,
    );
  });

  it('Returns a helpful message if the event in question is not found', () => {
    expect(moveEventToDay(groupedEventsByDay, 999, 4)).toEqual(
      'Event with ID 999 does not exist',
    );
  });
});
