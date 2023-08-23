import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import UIkit from "uikit";

const PollPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const authedUser = useSelector((state) => state.authedUser);
  const question = useSelector((state) => state.questions[id]);
  const author = useSelector((state) =>
    question ? state.users[question.author] : null
  );

  if (!question || !author) {
    return <Navigate to="/pagenotfound" />;
  }

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleVote = (option) => (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, option));
    UIkit.notification("Vote submitted successfully!", {
      status: "success",
    });
    navigate("/");
  };

  const calcPercentage = (option) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };
  return (
    <div>
      <h1 className="uk-text-large">Poll by {author.id}</h1>
      <div className="uk-flex uk-justify-center uk-margin">
        <img
          src={author.avatarURL}
          alt="Profile"
          className="uk-width-1-6 uk-justify-center"
        />
      </div>

      <div className="uk-flex uk-justify-center">
        <h2 className="uk-text-2xl uk-text-bold uk-margin-medium-top">
          Would you rather?
        </h2>
      </div>

      <div className="uk-grid uk-child-width-1-2 uk-gap-4 uk-margin-medium-top">
        {["optionOne", "optionTwo"].map((option) => (
          <button
            key={option}
            onClick={handleVote(option)}
            disabled={hasVoted}
            className="uk-button uk-button-primary uk-button-large uk-border-rounded uk-box-shadow-hover-small"
          >
            <div
              className={
                option === "optionOne"
                  ? "md-bg-red-200"
                  : "md-bg-light-blue-200"
              }
            >
              <p
                className={`uk-text-bold uk-margin-small-bottom text-green-600 ${
                  hasVoted &&
                  (option === "optionOne"
                    ? "uk-text-warning"
                    : "uk-text-primary")
                }

              `}
              >
                {question[option].text}
              </p>
              {!hasVoted && (
                <p className="uk-text-underline uk-text-underline-offset uk-margin-small-bottom text-green-600">
                  Click
                </p>
              )}
              {hasVoted && (
                <p className="uk-text-small uk-text-success">
                  Votes: {question[option].votes.length} (
                  {calcPercentage(option)})
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PollPage;
