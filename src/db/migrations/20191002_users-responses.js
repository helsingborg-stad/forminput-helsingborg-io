const up = async (db) => {
  await db.schema.createTable('responses', (t) => {
    t.increments('id').unsigned().primary();
    t.string('user_id').notNull();
    t.string('form_id').notNull();
    t.string('question_position').notNull();
    t.string('question_type').notNull();
    t.string('answer').notNull();
    t.dateTime('created_at').notNull().defaultsTo(db.fn.now());

    // indices
    t.unique('id');
  });
};

const down = async (db) => {
  await db.schema.dropTableIfExists('responses');
};

module.exports = {
  up,
  down,
};
