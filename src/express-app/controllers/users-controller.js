import User from "../models/users";
import { STATUS_MESSAGES } from "../consts/messages";

function getAllUsers(request, response) {
  User.find().exec((err, users) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
    }
    response.json(users);
  });
}

function deleteUser(request, response) {
  User.deleteOne({ _id: request.params.id }, (err, result) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
    }
    const { deletedCount } = result;
    if (deletedCount > 0) {
      response.json({ message: STATUS_MESSAGES.DELETED_SUCCESSFULLY });
    } else {
      response.json({ message: STATUS_MESSAGES.NO_RECORD_FOUND });
    }
  });
}

export default { getAllUsers, deleteUser };
