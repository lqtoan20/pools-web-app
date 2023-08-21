import { connect } from "react-redux";

const PageNotFound = () => {
  return (
    <div>
      <h1 className="uk-h2 uk-margin-medium-top">Page not found</h1>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PageNotFound);
