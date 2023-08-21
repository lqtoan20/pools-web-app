import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ question, author }) => {
  return (
    <Link to={"questions/" + question.id}>
      <div className="uk-margin-medium uk-padding-small uk-border-rounded uk-box-shadow-small uk-transition-toggle">
        <div className="uk-flex uk-flex-row uk-flex-middle uk-margin-small">
          <div className="uk-margin-small-right">
            <img
              className="uk-border-circle uk-box-shadow-medium"
              src={author?.avatarURL}
              width="48"
              height="48"
              alt="Author"
            />
          </div>
          <div className="uk-flex-column">
            <div className="uk-h4 uk-margin-remove">{question.author}</div>
            <p className="uk-text-small uk-margin-remove uk-text-muted">
              {new Date(question.timestamp).toDateString()}
            </p>
          </div>
        </div>
        <div className="uk-transition-fade uk-position-small uk-position-bottom-left uk-padding-small">
          <p className="uk-text-small">
            <span className="uk-text-primary uk-text-bold">Show</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default connect()(Card);
