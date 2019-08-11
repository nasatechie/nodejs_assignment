Node JS Mentoring Program Application

#### Requirements

- NodeJS version > 8

#### Installing the required dependencies

- npm install

#### Commands to run the application

- **List of scripts**

  - `npm run plain-text-server`
  - Starts a http server with `"Content-Type": "text/plain"` and returns `Hello World` as response

  - `npm run html-server`
  - Starts a http server with `"Content-Type": "text/html"` and returns html file content as response

  - `npm run html-server-stream`
  - Starts a http server with `"Content-Type": "text/html"` and returns html file content as response using streams

  - `npm run json-server`
  - Starts a http server with `"Content-Type": "application/json"` and returns a sample json response

  - `npm run express-server`
  - Starts an express application which responds to the below routes

    | URL                       | Method | Action                               |
    | ------------------------- | ------ | ------------------------------------ |
    | /api/products             | GET    | Return ALL Products                  |
    | /api/products/:id         | GET    | Return details of SINGLE Product     |
    | /api/products/:id/reviews | GET    | Returns reviews for a SINGLE Product |
    | /api/products             | POST   | Add NEW Product and returns it       |
    | /api/users                | GET    | Returns ALL Users                    |

  - /api/auth - **POST (JWT)**
    **Headers** - ContentType - `application/json`
    **Sample Payload**

    ```
        {
            "username": "sample_user_name",
            "password": "sample_pass_word"
        }
    ```

  - /api/auth/login - **POST (Local Passport Strategy)**
    **Headers** - ContentType - `application/json`
    **Sample Payload**
    ```
        {
            "username": "sample_user_name",
            "password": "sample_pass_word"
        }
    ```
  **Social Logins**
  - /api/auth/google
  - /api/auth/facebook
  - /api/auth/twitter
