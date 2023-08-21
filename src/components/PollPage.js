import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import UIkit from "uikit";
import { useEffect } from "react"; // Import useEffect

const PollPage = ({ dispatch, authedUser, question, author }) => {
  const navigate = useNavigate();

  // Use useEffect to handle initial data fetching
  useEffect(() => {
    if (!authedUser || !question || !author) {
      UIkit.notification("Question or user not found.", {
        status: "danger",
      });
      navigate("/pagenotfound");
    }
  }, [authedUser, question, author, navigate]);

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
          className="uk-height-24 uk-width-24"
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
            className={
              "uk-button uk-button-primary uk-button-large uk-border-rounded uk-box-shadow-hover-small " +
              (hasVotedForOptionOne && option === "optionOne"
                ? "bg-lime-400"
                : hasVotedForOptionTwo && option === "optionTwo"
                ? "bg-lime-400"
                : "bg-blue-400") // Change the default button color to blue
            }
          >
            <div className={hasVoted && hasVotedForOptionOne ? "chosen" : ""}>
              <p className="uk-text-bold uk-margin-small-bottom text-green-600">
                {" "}
                {/* Change text color to green */}
                {question[option].text}
              </p>
              {!hasVoted && (
                <p className="uk-text-underline uk-text-underline-offset uk-margin-small-bottom text-green-600">
                  {" "}
                  {/* Change text color to green */}
                  Click
                </p>
              )}
              {hasVoted && (
                <p className="uk-text-small text-green-600">
                  {" "}
                  {/* Change text color to green */}
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

const mapStateToProps = ({ authedUser, users, questions }) => {
  const question = Object.values(questions).find(
    (question) => question.id === useParams().id
  );
  const author = Object.values(users).find(
    (user) => user.id === question.author
  );
  return { authedUser, question, author };
};

export default connect(mapStateToProps)(PollPage);
