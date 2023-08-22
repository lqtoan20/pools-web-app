import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const Nav = ({ dispatch, authedUserId }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };

  return (
    <nav className="uk-flex uk-flex-center uk-margin-medium-top">
      <ul className="uk-subnav uk-subnav-divider">
        <li>
          <Link to="/" className="uk-text-bold uk-link-text">
            Home
          </Link>
        </li>
        <li>
          <Link to="/leaderboards" className="uk-text-bold uk-link-text">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/new" className="uk-text-bold uk-link-text">
            New Poll
          </Link>
        </li>
        <li>
          <span
            data-testid="information-data"
            className="uk-text-bold"
          >{`User: ${authedUserId}`}</span>
        </li>
        <li>
          <button
            onClick={logout}
            className="uk-button uk-button-default uk-margin-small-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
});

export default connect(mapStateToProps)(Nav);
