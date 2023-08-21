import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1 className="uk-h2 uk-margin-medium-top">Page not found</h1>
      <Link to="/">Back To The Home Page </Link>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PageNotFound);
