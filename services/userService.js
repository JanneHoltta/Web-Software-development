import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
        (email, password)
        VALUES ($1, $2)`,
    email,
    password,
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $1",
    email,
  );

  return result.rows;
};

const admin = async (id) => {
  await executeQuery(
    "UPDATE users SET admin = TRUE WHERE id = $1",
    id,
  );
};

const checkAdminValue = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM users WHERE id = $1",
    id,
  );
  console.log(res.rows[0].admin);
  return res.rows[0].admin;
};

export { addUser, findUserByEmail, admin, checkAdminValue };
