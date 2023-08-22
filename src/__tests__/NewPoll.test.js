import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../stores/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "../components/NewPoll";

describe("NewPoll", () => {
  it("Should render component and display all elements", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();

    const firstOptionInput = component.getByTestId("first-option");
    const secondOptionInput = component.getByTestId("second-option");

    expect(firstOptionInput).toBeInTheDocument();
    expect(secondOptionInput).toBeInTheDocument();

    fireEvent.change(firstOptionInput, { target: { value: "Test 1" } });
    fireEvent.change(secondOptionInput, { target: { value: "Test 2" } });
    expect(firstOptionInput.value).toBe("Test 1");
    expect(secondOptionInput.value).toBe("Test 2");
  });
});
