export function sendBadRequestResponse(response, error) {
  sendErrorResponse(response, 400, error);
}

export function sendInternalServerError(response, error) {
  sendErrorResponse(response, 500, error);
}

export function sendErrorResponse(response, status, error) {
  response.status(status).send(error);
}
