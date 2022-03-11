import { executeQuery } from "../database/database.js";

const randomQuestion = async (topic_id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1 ORDER BY RANDOM() LIMIT 1",
    topic_id,
  );
  return res.rows[0];
};

const addQuestionAsnwer = async (
  user_id,
  question_id,
  question_answer_option_id,
) => {
  await executeQuery(
    `INSERT INTO question_answers 
    (user_id, question_id, question_answer_option_id)
    VALUES ($1, $2, $3)`,
    user_id,
    question_id,
    question_answer_option_id,
  );
};

const selectedAnswerOption = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE id = $1",
    id,
  );
  return res.rows;
};

const checkCorrect = async (question_answer_option_id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_answer_option_id = $1",
    question_answer_option_id,
  );
  return res.rows[0];
};

const getRandomQuizTopic = async () => {
  const res = await executeQuery(
    "SELECT * FROM topics ORDER BY RANDOM() LIMIT 1",
  );
  return res.rows[0];
};

const getRandomQuizQuestion = async (random_topic_id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1 ORDER BY RANDOM() LIMIT 1",
    random_topic_id,
  );
  return res.rows[0];
};

export {
  addQuestionAsnwer,
  checkCorrect,
  getRandomQuizQuestion,
  getRandomQuizTopic,
  randomQuestion,
  selectedAnswerOption,
};
