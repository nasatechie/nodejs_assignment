import { userModel as User } from "../../database";

function getAllUsers(request, response) {
  response.header("Content-Type", "application/json");
  User.findAll().then(usersData => {
    response.json(usersData);
  });
}

export default { getAllUsers };
