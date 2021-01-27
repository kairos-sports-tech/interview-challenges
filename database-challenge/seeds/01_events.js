const casual = require('casual');
const { add, set } = require('date-fns');

export const array = (length, generateElement) => {
  const array = new Array(length);
  for (let index = 0; index < array.length; index++) {
    array[index] = generateElement(index);
  }
  return array;
};

// Set the 🌱 so the seed files produce deterministic results
casual.seed(3291029);

export const seed = async (knex) => {
  const eventLengthMinutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  await knex.into('events').insert(
    array(1000, () => {
      const startsAt = set(new Date(), {
        year: 2020,
        month: casual.month_number,
        day: casual.day_of_month,
      });
      const hasTitle = casual.coin_flip;
      return {
        title: hasTitle ? casual.title : '',
        startsAt,
        endsAt: add(startsAt, {
          minutes: casual.random_element(eventLengthMinutes),
        }),
      };
    }),
  );
};
