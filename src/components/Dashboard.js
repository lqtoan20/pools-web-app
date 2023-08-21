import { connect } from "react-redux";
import Card from "./Card";

const Dashboard = ({ authedUser, questions, users }) => {
  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div>
      <h1
        className="uk-heading-medium uk-margin-large-top"
        data-testid="heading"
      >
        Dashboard
      </h1>

      <h2 className="uk-h2 uk-margin-medium-top">New Questions</h2>
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

      <h2 className="uk-h2 uk-margin-medium-top">Answered Questions</h2>
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

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
