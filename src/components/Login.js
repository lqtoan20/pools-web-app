import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/authedUser";

const Login = ({ dispatch, loggedIn }) => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1
        className="uk-heading-medium uk-margin-large-top"
        data-testid="login-heading"
      >
        Login
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="username">
            Username
          </label>
          <div className="uk-form-controls">
            <input
              value={username}
              onChange={handleUsername}
              type="text"
              name="username"
              id="username"
              className="uk-input"
              data-testid="username"
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="password">
            Password
          </label>
          <div className="uk-form-controls">
            <input
              value={password}
              onChange={handlePassword}
              type="password"
              name="password"
              id="password"
              className="uk-input"
              data-testid="password"
            />
          </div>
        </div>
        <div className="uk-margin uk-flex uk-flex-right">
          <button
            type="submit"
            className="uk-button uk-button-primary"
            data-testid="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
