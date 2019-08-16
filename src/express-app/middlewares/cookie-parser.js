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
