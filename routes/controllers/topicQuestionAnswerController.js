import * as answerService from "../../services/answerService.js";
import * as topicsService from "../../services/topicsService.js";
import * as topicQuestionService from "../../services/topicQuestionService.js";

const addAnswer = async ({ response, request, render }) => {
  const body = request.body({ type: "form" });
  const formdata = await body.value;
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const text = formdata.get("option_text");
  const check = formdata.has("is_correct");
  if (text && text.length > 0) {
    await answerService.addAnswer(
      parts[4],
      text,
      check,
    );
    response.redirect(`/topics/${parts[2]}/questions/${parts[4]}`);
  } else {
    const errorData = {
      question: await topicQuestionService.viewQuestion(parts[4]),
      topic: await topicsService.findById(parts[2]),
      answers: await answerService.viewAnswers(parts[4]),
      errors: ["Answer text should be atleast one character."],
    };
    render("question.eta", errorData);
  }
};

const viewAnswers = async ({ render, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const data = {
    question: await topicQuestionService.viewQuestion(parts[4]),
    topic: await topicsService.findById(parts[2]),
    answers: await answerService.viewAnswers(parts[4]),
  };
  render("question.eta", data);
};

const deleteAnswer = async ({ response, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  await answerService.deleteById(parts[6]);
  response.redirect(`/topics/${parts[2]}/questions/${parts[4]}`);
};

const deleteQuestion = async ({ response, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  await answerService.deleteQuestion(parts[2], parts[4]);
  response.redirect(`/topics/${parts[2]}`);
};

export { addAnswer, deleteAnswer, deleteQuestion, viewAnswers };
