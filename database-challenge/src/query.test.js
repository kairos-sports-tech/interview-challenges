const database = require('./database').connect();
const {
  eventCountByLengthByMonth,
  updateMissingEventTitles,
  insertNewEvent,
} = require('./queries');

beforeEach(async () => {
  await database.migrate.latest();
  await database.seed.run();
});

afterEach(async () => {
  await database.migrate.rollback();
  await database.destroy();
});

test('insertNewEvent', () => {
  expect(async () => {
    insertNewEvent();
  }).not.toThrow();
});

test('updateMissingEventTitles', () => {
  expect(async () => {
    updateMissingEventTitles();
  }).not.toThrow();
});

test('eventCountByLengthByMonth', async () => {
  expect(await eventCountByLengthByMonth()).toMatchInlineSnapshot(``);
});
