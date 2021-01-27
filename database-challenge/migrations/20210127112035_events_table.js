exports.up = function (knex) {
  return knex.raw(`
    create table events (
      id serial primary key,
      startsAt timestamp not null,
      endsAt timestamp not null,
      title text not null
    );
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    drop table events;
  `);
};
