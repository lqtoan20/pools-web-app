import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux"; // For providing the store
import Card from "../components/Card"; // Adjust the path accordingly
import { store } from "../stores/store";
import { BrowserRouter } from "react-router-dom";

// Basic test to check if the component renders correctly
test("Card component renders correctly", () => {
  const question = {
    id: "123",
    author: "sarahedo",
    timestamp: 1630070400000,
  };
  const author = {
    id: "sarahedo",
    avatarURL: "https://example.com/avatar.jpg",
  };

  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Card question={question} author={author} />
      </BrowserRouter>
    </Provider>
  );

  expect(getByText("sarahedo")).toBeInTheDocument();
  expect(getByText("Fri Aug 27 2021")).toBeInTheDocument();
});

// Snapshot test to check if the component's UI matches the snapshot
test("Card component matches snapshot", () => {
  const question = {
    id: "123",
    author: "sarahedo",
    timestamp: 1630070400000,
  };
  const author = {
    id: "sarahedo",
    avatarURL: "https://example.com/avatar.jpg",
  };

  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Card question={question} author={author} />
      </BrowserRouter>
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
