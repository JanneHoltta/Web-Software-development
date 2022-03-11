import { executeQuery } from "../database/database.js";

const addTopic = async (user_id, name) => {
  await executeQuery(
    `INSERT INTO topics
        (user_id, name)
        VALUES ($1, $2)`,
    user_id,
    name,
  );
};

const listTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics ORDER BY name ASC`);
  return res.rows;
};
const listTopicsNumber = async () => {
  const res = await executeQuery(`SELECT * FROM topics`);
  return res.rows.length;
};

const listQuestionsNumber = async () => {
  const res = await executeQuery(`SELECT * FROM questions`);
  return res.rows.length;
};

const listAnswersNumber = async () => {
  const res = await executeQuery(`SELECT * FROM question_answer_options`);
  return res.rows.length;
};

const deleteById = async (id) => {
  await executeQuery("DELETE FROM topics WHERE id = $1", id);
};

const findById = async (id) => {
  const result = await executeQuery("SELECT * FROM topics WHERE id = $1", id);
  return result.rows[0];
};

export {
  addTopic,
  deleteById,
  findById,
  listAnswersNumber,
  listQuestionsNumber,
  listTopics,
  listTopicsNumber,
};
