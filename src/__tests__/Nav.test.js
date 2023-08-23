import { store } from "../stores/store";
import React from "react";
import Nav from "../components/Nav";
import { setAuthedUser } from "../actions/authedUser";
import { Wrapper } from "../test-utils";

describe("Nav", () => {
  it("should render the component", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));
    const component = Wrapper(<Nav />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display username of logged in user", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));

    const component = Wrapper(<Nav />);

    expect(component.getByTestId("information-data").textContent).toBe(
      "User: sarahedo"
    );
  });
});
