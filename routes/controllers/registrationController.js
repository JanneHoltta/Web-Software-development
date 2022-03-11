import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const formData = await body.value;
  const pass = formData.get("password");
  if (pass && pass.length > 3) {
    await userService.addUser(
      formData.get("email"),
      await bcrypt.hash(pass),
    );
    response.redirect("/auth/login");
  } else {
    const errorData = {
      errors: ["Password should be atleast four character."],
    };
    render("registration.eta", errorData);
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };
