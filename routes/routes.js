import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as topicQuestionController from "./controllers/topicQuestionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicQuestionAnswerController from "./controllers/topicQuestionAnswerController.js";
import * as quizController from "./controllers/quizController.js";
import * as api from "./apis/api.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.get("/topics/:id", topicQuestionController.viewQuestions);
router.post("/topics/:id/questions", topicQuestionController.addQuestion);
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get(
  "/topics/:id/questions/:qId",
  topicQuestionAnswerController.viewAnswers,
);
router.post(
  "/topics/:id/questions/:qId/options",
  topicQuestionAnswerController.addAnswer,
);
router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  topicQuestionAnswerController.deleteAnswer,
);
router.post(
  "/topics/:tId/questions/:qId/delete",
  topicQuestionAnswerController.deleteQuestion,
);
router.get("/quiz", quizController.viewQuiz);
router.get("/quiz/:tId", quizController.redirectRandom);
router.get("/quiz/:tId/questions/:qId", quizController.randomQuestion);

router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.checkAsnwer,
);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);
router.get("/api/questions/random", api.randomQuestion);
router.post("/api/questions/answer", api.apiAnswer);
export { router };
