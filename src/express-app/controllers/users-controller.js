import { Request, Response } from "express";
import users from "../models/users";

/**
 * Function which returns the list of all the available users
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns: List of the all the available users
 */
function getAllUsers(request, response) {
  response.header("Content-Type", "application/json");
  response.send(JSON.stringify({ users }, null, 4));
}

export default { getAllUsers };
