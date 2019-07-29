import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "express";
/**
 * Function which parses the cookie in request headers, parses it and adds it to the response sent back to the client
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {NextFunction} next
 */
const cookieParser = (request, response, next) => {
  let cookies = request.headers.cookie;
  let parsedCookies = {};
  cookies &&
    cookies.split(";").forEach(cookie => {
      let parts = cookie.split("=");
      parsedCookies[parts.shift().trim()] = decodeURI(parts.join("="));
    });
  request.parsedCookies = parsedCookies;
  next();
};

export default cookieParser;
