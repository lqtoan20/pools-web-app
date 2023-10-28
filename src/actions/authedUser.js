export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";

// Action creators 1
export function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  };
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}

// Thunk actions
export function handleLogin(username, password) {
  return (dispatch, getState) => {
    const { users } = getState();

    const user = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );

    if (user) {
      dispatch(setAuthedUser(user));
    } else {
      // Handle login failure here (e.g., show an error message)
      console.log("Login failed: Invalid username or password");
    }
  };
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(logoutAuthedUser());
    // Perform additional logout-related actions if needed
  };
}
