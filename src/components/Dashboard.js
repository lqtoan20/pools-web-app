import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Dashboard = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) =>
    Object.values(state.questions).sort((a, b) => b.timestamp - a.timestamp)
  );
  const users = useSelector((state) => state.users);

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div>
      <h2
        className="uk-h2 uk-text-bolder uk-text-center"
        data-testid="new-question"
      >
        New Questions
      </h2>
      <ul
        className="uk-grid-small uk-child-width-1-2@s uk-margin-large-top"
        data-uk-grid
      >
        {questions.filter(unanswered).map((question) => (
          <li key={question.id}>
            <div className="uk-card uk-card-default uk-card-small uk-card-hover">
              <div className="uk-card-body">
                <Card question={question} author={users[question.author]} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2
        className="uk-h2 uk-text-bolder uk-text-center"
        data-testid="answered-question"
      >
        Answered Questions
      </h2>
      <ul
        className="uk-grid-small uk-child-width-1-2@s uk-margin-large-top"
        data-uk-grid
      >
        {questions.filter(answered).map((question) => (
          <li key={question.id}>
            <div className="uk-card uk-card-default uk-card-small uk-card-hover">
              <div className="uk-card-body">
                <Card question={question} author={users[question.author]} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
