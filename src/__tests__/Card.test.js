import React from "react";
import Card from "../components/Card"; // Adjust the path accordingly
import { Wrapper } from "../test-utils";

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

  const { getByText } = Wrapper(<Card question={question} author={author} />);
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

  const component = Wrapper(<Card question={question} author={author} />);
  expect(component).toMatchSnapshot();
});
