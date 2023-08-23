import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Dashboard = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) =>
    Object.values(state.questions).sort((a, b) => b.timestamp - a.timestamp)
  );
  const users = useSelector((state) => state.users);

  const [isToggle, setIsToggle] = useState("unanswered");

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  const handleToggleChange = (event) => {
    setIsToggle(event.target.value);
  };

  const filteredQuestions =
    isToggle === "unanswered"
      ? questions.filter(unanswered)
      : questions.filter(answered);

  return (
    <div>
      <h2 className="uk-h2 uk-text-bolder uk-text-center">
        {isToggle === "unanswered"
          ? "Unanswered Questions"
          : "Answered Questions"}
      </h2>
      <div className="uk-margin-small-right">
        <input
          type="radio"
          id="unanswered"
          name="toggle"
          value="unanswered"
          checked={isToggle === "unanswered"}
          onChange={handleToggleChange}
        />
        <label htmlFor="unanswered" data-testid="new-question">
          Unanswered
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="answered"
          name="toggle"
          value="answered"
          checked={isToggle === "answered"}
          onChange={handleToggleChange}
        />
        <label htmlFor="answered" data-testid="answered-question">
          Answered
        </label>
      </div>
      <ul
        className="uk-grid-small uk-child-width-1-2@s uk-margin-large-top"
        data-uk-grid
      >
        {filteredQuestions.map((question) => (
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
