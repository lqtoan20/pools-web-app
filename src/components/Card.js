import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ question, author }) => {
  return (
    <Link to={"questions/" + question.id}>
      <div className="uk-card uk-card-default uk-card-hover">
        <div className="uk-card-header">
          <div className="uk-grid-small uk-flex-middle uk-grid">
            <div className="uk-width-auto">
              <img
                className="uk-border-circle"
                width="40"
                height="40"
                src={author?.avatarURL}
                alt="Avatar"
              />
            </div>
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom">
                {question.author}
              </h3>
              <p className="uk-text-meta uk-margin-remove-top">
                {" "}
                {new Date(question.timestamp).toDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="uk-card-footer">
          <button className="uk-button uk-button-text">Show</button>
        </div>
      </div>
    </Link>
  );
};

export default connect()(Card);
