import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewPoll from "./components/NewPoll";
import PollPage from "./components/PollPage";
import LeaderBoard from "./components/LeaderBoard";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import { handleInitialData } from "./actions/shared";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const loggedIn = useSelector((state) => !!state.authedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div className="uk-container uk-margin-medium-top">
      {loggedIn && <Nav />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboards"
          exact
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <PollPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          exact
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route path="/pagenotfound" exact element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
