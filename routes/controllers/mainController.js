import * as topicService from "../../services/topicsService.js";

const showMain = async ({ render }) => {
  const data = {
    numberOfTopics: await topicService.listTopicsNumber(),
    numberOfQuestions: await topicService.listQuestionsNumber(),
    numberOfAnswers: await topicService.listAnswersNumber(),
  };
  render("main.eta", data);
};

export { showMain };
