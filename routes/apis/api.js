import { executeQuery } from "../../database/database.js";
import { checkIsCorrect } from "../../services/answerService.js";

const randomQuestion = async ({ response }) => {
  const topic = await executeQuery(
    "SELECT * FROM topics ORDER BY RANDOM() LIMIT 1",
  );
    const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1 ORDER BY RANDOM() LIMIT 1",
   topic.rows[0].id,
  );
  const a = result.rows[0].id;
  const result1 = await executeQuery(
   "SELECT * FROM question_answer_options WHERE question_id = $1",
  a,
  );
  response.body = {
    questionId: result.rows[0].id,
    questionText: result.rows[0].question_text,
    answerOptions: result1.rows,
  };
  
};

const apiAnswer = async ({ response, request, questionId, optionId }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const a = document.questionId;
  const b = document.optionId;
  console.log(a);
  console.log(b);
  console.log(response.body);
  console.log(checkIsCorrect(b));
  response.body = {
    answer: await checkIsCorrect(b),
  };
};

export { apiAnswer, randomQuestion };
