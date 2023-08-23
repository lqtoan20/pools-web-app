import React from "react";
import { fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import { Wrapper } from "../test-utils";

test("Login component renders correctly", () => {
  const { getByTestId } = Wrapper(<Login />);

  expect(getByTestId("login-heading")).toHaveTextContent("Login");
  expect(getByTestId("username")).toBeInTheDocument();
  expect(getByTestId("password")).toBeInTheDocument();
});

test("Submitting form triggers handleLogin", async () => {
  const component = Wrapper(<Login />);

  const usernameInput = component.getByTestId("username");
  const passwordInput = component.getByTestId("password");
  const loginButton = component.getByTestId("submit");

  fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  fireEvent.click(loginButton);

  expect(usernameInput.value).toBe("");
  expect(passwordInput.value).toBe("");
});
