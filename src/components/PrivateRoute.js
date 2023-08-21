import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import UIkit from "uikit"; // Import thư viện UIkit

const PrivateRoute = ({ children, loggedIn }) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  if (loggedIn) {
    return children;
  } else {
    UIkit.notification("Please log in to access this page.", {
      status: "danger",
    });
    return <Navigate to={`/login?redirectTo=${redirectUrl}`} />;
  }
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
