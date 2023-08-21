import { connect } from "react-redux";

const LeaderBoard = ({ users }) => {
  return (
    <div>
      <table className="uk-table uk-table-hover uk-table-striped">
        <thead>
          <tr>
            <th className="uk-table-expand">Name</th>
            <th className="uk-table-expand">Id</th>
            <th className="uk-width-small">Answered</th>
            <th className="uk-width-small">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <span className="uk-text-bold">{user.name}</span>
              </td>
              <td> {user.id}</td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapStateToProps)(LeaderBoard);
