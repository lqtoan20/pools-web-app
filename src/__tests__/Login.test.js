import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../stores/store";
import Login from "../components/Login";

test("Login component renders correctly", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(getByTestId("login-heading")).toHaveTextContent("Login");
  expect(getByTestId("username")).toBeInTheDocument();
  expect(getByTestId("password")).toBeInTheDocument();
});

test("Submitting form triggers handleLogin", async () => {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const usernameInput = component.getByTestId("username");
  const passwordInput = component.getByTestId("password");
  const loginButton = component.getByTestId("submit");

  fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  fireEvent.click(loginButton);

  expect(usernameInput.value).toBe("");
  expect(passwordInput.value).toBe("");
});
