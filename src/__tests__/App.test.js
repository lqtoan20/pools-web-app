import React from "react";
import App from "../App";
import { store } from "../stores/store";
import { setAuthedUser } from "../actions/authedUser";
import { Wrapper } from "../test-utils";

describe("App", () => {
  it("should render the component", () => {
    const component = Wrapper(<App />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should show Login page when not logged in", () => {
    const component = Wrapper(<App />);
    const heading = component.getByTestId("login-heading");
    expect(heading).toBeInTheDocument();
  });

  it("should show Dashboard page when logged in", () => {
    store.dispatch(setAuthedUser({ id: "", password: "" }));
    const component = Wrapper(<App />);
    expect(component.getByTestId("new-question")).toBeInTheDocument();
    expect(component.getByTestId("answered-question")).toBeInTheDocument();
  });
});
