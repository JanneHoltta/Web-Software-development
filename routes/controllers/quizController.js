import * as topicService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as topicQuestionService from "../../services/topicQuestionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicsService from "../../services/topicsService.js";

const viewQuiz = async ({ render }) => {
  render("quiz.eta", { topics: await topicService.listTopics() });
};

const randomQuestion = async ({ render, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  render("quizTopic.eta", {
    question: await topicQuestionService.viewQuestion(parts[4]),
    answers: await answerService.viewAnswers(parts[4]),
    topic: await topicsService.findById(parts[2]),
  });
};

const redirectRandom = async ({ response, request, render }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const random = await quizService.randomQuestion(parts[2]);
  const x = typeof random;
  if ( x === "undefined") {
    const errorData = {
      errors: ["No questions for the topic"],
      question: [],
      topic: await topicsService.findById(parts[2]),
      answers: [],
    };
    render("quizTopic.eta", errorData);
  } else {
    console.log("terve");
    response.redirect(`/quiz/${parts[2]}/questions/${random.id}`);
  }
};

const redirectRandomQuiz = async ({ response }) => {
  const randomTopic = await quizService.getRandomQuizQuestion();
  const randomQuestion = await quizService.getRandomQuizQuestion(randomTopic);
  response.redirect(`/quiz/${randomTopic}/questions/${randomQuestion}`);
};

const addQuestionAsnwer = async ({ request, user }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  await quizService.addQuestionAsnwer(
    user.id,
    parts[4],
    parts[6],
  );
};

const checkAsnwer = async ({ request, response }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const correct = await answerService.checkIsCorrect(
    parts[6],
  );
  if (correct) {
    response.redirect(`/quiz/${parts[2]}/questions/${parts[4]}/correct`);
  } else {
    response.redirect(`/quiz/${parts[2]}/questions/${parts[4]}/incorrect`);
  }
};

const showCorrect = async ({ render, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const data = {
    topic: await topicsService.findById(parts[2]),
  };
  render("answerCorrect.eta", data);
};

const showIncorrect = async ({ render, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const correct = await answerService.checkCorrect(
    parts[4],
  );
    const data = {
      answer: correct,
      topic: await topicsService.findById(parts[2]),
    };
  render("answerIncorrect.eta", data);
};

export {
  addQuestionAsnwer,
  checkAsnwer,
  randomQuestion,
  redirectRandom,
  redirectRandomQuiz,
  showCorrect,
  showIncorrect,
  viewQuiz,
};
