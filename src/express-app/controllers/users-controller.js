import User from "../models/users";
function getAllUsers(request, response) {
  response.header("Content-Type", "application/json");

  User.find().exec((err, users) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    response.json(users);
  });
}

function deleteUser(request, response) {
  User.deleteOne({ _id: request.params.id }, (err, result) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    const { deletedCount } = result;
    if (deletedCount > 0) {
      response.json({ message: "Deleted Successfully" });
    } else {
      response.json({ message: "No record found!" });
    }
  });
}

export default { getAllUsers, deleteUser };
