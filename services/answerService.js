import { executeQuery } from "../database/database.js";

const addAnswer = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
        VALUES ($1, $2, $3)`,
    question_id,
    option_text,
    is_correct,
  );
};

const viewAnswers = async (question_id) => {
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $1`,
    question_id,
  );
  return result.rows;
};

const checkIsCorrect = async (answer_option_id) => {
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE id = $1`,
    answer_option_id,
  );
  return result.rows[0].is_correct;
};

const checkCorrect = async (question_id) => {
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct`,
    question_id,
  );
  return result.rows[0].option_text;
};

const findById = async (topic_id) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1",
    topic_id,
  );
  return result.rows;
};

const deleteById = async (id) => {
  await executeQuery("DELETE FROM question_answer_options WHERE id = $1", id);
};

const deleteQuestion = async (topic_id, user_id) => {
  await executeQuery(
    "DELETE FROM questions WHERE user_id = $1 AND topic_id = $2",
    topic_id,
    user_id,
  );
};

export {
  addAnswer,
  checkIsCorrect,
  deleteById,
  deleteQuestion,
  findById,
  viewAnswers,
  checkCorrect
};
