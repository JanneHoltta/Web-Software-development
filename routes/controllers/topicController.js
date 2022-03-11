import * as topicService from "../../services/topicsService.js";
import * as userService from "../../services/userService.js";
const addTopic = async ({ request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const name = params.get("name");

  if (name && name.length > 0) {
    await topicService.addTopic(
      user.id,
      name,
    );
    response.redirect("/topics");
  } else {
    const errorData = {
      topics: [],
      errors: ["Name should be atleast one character."],
    };
    render("topics.eta", errorData);
  }
};

const listTopics = async ({ render, user }) => {
  console.log(user.id);
  const data = {
    topics: await topicService.listTopics(),
    admin: await userService.checkAdminValue(user.id),
  };
  render("topics.eta", data);
};

const deleteTopic = async ({ params, response }) => {
  await topicService.deleteById(params.id);
  response.redirect("/topics");
};

export { addTopic, deleteTopic, listTopics };
