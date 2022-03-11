import * as topicQuestionService from "../../services/topicQuestionService.js";
import * as topicsService from "../../services/topicsService.js";

const addQuestion = async ({ response, request, user, params, render }) => {
  const body = request.body({ type: "form" });
  const formdata = await body.value;
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const text = formdata.get("question_text");
  if (text && text.length > 0) {
    await topicQuestionService.addQuestion(
      user.id,
      parts[2],
      text,
    );
    response.redirect(`/topics/${params.id}`);
  } else {
    const errorData = {
      questions: await topicQuestionService.viewQuestions(parts[2]),
      topic: await topicsService.findById(parts[2]),
      errors: ["Question text should be atleast one character."],
    };
    render("topic.eta", errorData);
  }
};

const viewQuestions = async ({ render, request }) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const data = {
    questions: await topicQuestionService.viewQuestions(parts[2]),
    topic: await topicsService.findById(parts[2]),
  };
  render("topic.eta", data);
};

export { addQuestion, viewQuestions };
