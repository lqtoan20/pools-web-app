import { connect } from "react-redux";

const LeaderBoard = ({ users }) => {
  return (
    <div>
      <h1 className="uk-heading-3x1 uk-margin-remove-top">Leaderboard</h1>

      <table className="uk-table uk-table-divider uk-table-small uk-margin-medium-top">
        <thead>
          <tr>
            <th className="uk-table-expand">User</th>
            <th className="uk-width-small">Answered</th>
            <th className="uk-width-small">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="uk-table-link">
                <span className="uk-text-bold">{user.name}</span>
                <br />
                {user.id}
              </td>
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
