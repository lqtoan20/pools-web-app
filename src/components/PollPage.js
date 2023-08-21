import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import UIkit from "uikit";
const PollPage = ({ dispatch, authedUser, question, author }) => {
  const navigate = useNavigate();

  if (!authedUser || !question || !author) {
    UIkit.notification("Question or user not found.", {
      status: "danger",
    });
    return <Navigate to="/pagenotfound" />;
  }

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
    UIkit.notification("Vote submitted successfully!", {
      status: "success",
    }); // Hiển thị thông báo thành công bằng UIkit
    navigate("/");
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
    UIkit.notification("Vote submitted successfully!", {
      status: "success",
    }); // Hiển thị thông báo thành công bằng UIkit
    navigate("/");
  };

  const calcPercentage = (option, question) => {
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
      <h1 className="uk-text-3xl uk-text-bold uk-margin-medium-top">
        Poll by {author.id}
      </h1>

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
        <button
          onClick={handleOptionOne}
          disabled={hasVoted}
          className={
            "uk-button uk-button-primary uk-button-large uk-border-rounded uk-box-shadow-hover-small " +
            (hasVotedForOptionOne ? "bg-lime-400" : "")
          }
        >
          <div className={hasVotedForOptionOne ? "chosen" : ""}>
            <p className="uk-text-bold uk-margin-small-bottom">
              {question.optionOne.text}
            </p>
            {!hasVoted && (
              <p className="uk-text-underline uk-text-underline-offset uk-margin-small-bottom">
                Click
              </p>
            )}
            {hasVoted && (
              <p className="uk-text-small">
                Votes: {question.optionOne.votes.length} (
                {calcPercentage("optionOne", question)})
              </p>
            )}
          </div>
        </button>

        <button
          onClick={handleOptionTwo}
          disabled={hasVoted}
          className={
            "uk-button uk-button-primary uk-button-large uk-border-rounded uk-box-shadow-hover-small " +
            (hasVotedForOptionTwo ? "bg-lime-400" : "")
          }
        >
          <p className="uk-text-bold uk-margin-small-bottom">
            {question.optionTwo.text}
          </p>
          {!hasVoted && (
            <p className="uk-text-underline uk-text-underline-offset uk-margin-small-bottom">
              Click
            </p>
          )}
          {hasVoted && (
            <p className="uk-text-small">
              Votes: {question.optionTwo.votes.length} (
              {calcPercentage("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  try {
    const question = Object.values(questions).find(
      (question) => question.id === useParams().id
    );
    const author = Object.values(users).find(
      (user) => user.id === question.author
    );
    return { authedUser, question, author };
  } catch (e) {
    UIkit.notification("Question or user not found.", {
      status: "danger",
    });
    return <Navigate to="/pagenotfound" />;
  }
};

export default connect(mapStateToProps)(PollPage);
