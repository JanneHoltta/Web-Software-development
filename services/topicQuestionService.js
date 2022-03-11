import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, topic_id, question_text) => {
  await executeQuery(
    `INSERT INTO questions
    (user_id, topic_id, question_text)
    VALUES ($1, $2, $3)`,
    user_id,
    topic_id,
    question_text,
  );
};

const viewQuestions = async (topic_id) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1",
    topic_id,
  );
  return result.rows;
};

const viewQuestion = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE id = $1",
    id,
  );
  return result.rows[0];
};

export { addQuestion, viewQuestion, viewQuestions };
