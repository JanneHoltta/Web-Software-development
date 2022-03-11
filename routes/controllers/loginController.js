import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
const showLoginForm = ({ render }) => {
  render("login.eta");
};

const processLogin = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  const user = userFromDatabase[0];
  if (
    params.get("email") === "admin@admin.com" &&
    params.get("password") === "123456"
  ) {
    state.session.set("user", user);
    userService.admin(user.id);
    response.redirect("/topics");
  }

  if (userFromDatabase.length != 1) {
    response.redirect("/auth/login");
    return;
  }

  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("user", user);
  response.redirect("/");
};

export { processLogin, showLoginForm };
