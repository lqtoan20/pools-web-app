# Polls web app2

This is the starter code for the final assessment project for Udacity's React & Redux course.

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

- Users
- Questions

We have common 4 methods:

- `_getUsers()` : Get all of the existing users from the database.
- `_getQuestions()` : Get all of the existing questions from the database.
- `_saveQuestion(question)` : Save the polling question in the database. If one of the parameters are missing, an error is thrown.
- `_saveQuestionAnswer(object)` : Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown.

## Installation

Run `npm install` to download all dependencies.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Folder structure

| Folder                    | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| `__tests__`               | Include all test for app                                           |
| `__tests__/__snapshots__` | Include snapshots files                                            |
| `actions`                 | Include function for app                                           |
| `components`              | Include all component for app Card, Dashboard, Login, Nav, Poll... |
| `helper`                  | Include mock data and api                                          |
| `reducers`                | Reducers for app                                                   |
| `stores`                  | Config store for app                                               |

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
