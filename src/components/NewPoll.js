import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import UIkit from "uikit";

const NewPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOptionChange = (e) => {
    const value = e.target.value;
    setFirstOption(value);
  };

  const handleSecondOptionChange = (e) => {
    const value = e.target.value;
    setSecondOption(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(firstOption, secondOption));
    UIkit.notification("Question added successfully!", {
      status: "success",
    });
    setFirstOption("");
    setSecondOption("");
    navigate("/");
  };

  return (
    <div>
      <h1 className="uk-text-3x1 uk-text-bold uk-margin-medium-top">
        New Poll
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        <div className="uk-margin">
          <label htmlFor="firstOption" className="uk-form-label">
            First Option
          </label>
          <div className="uk-form-controls">
            <input
              value={firstOption}
              onChange={handleFirstOptionChange}
              type="text"
              name="firstOption"
              id="firstOption"
              className="uk-input"
              data-testid="first-option"
            />
          </div>
        </div>

        <div className="uk-margin">
          <label htmlFor="secondOption" className="uk-form-label">
            Second Option
          </label>
          <div className="uk-form-controls">
            <input
              value={secondOption}
              onChange={handleSecondOptionChange}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="second-option"
              className="uk-input"
            />
          </div>
        </div>

        <div className="uk-margin uk-flex uk-flex-right">
          <button
            type="submit"
            data-testid="submit-poll"
            className="uk-button uk-button-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPoll;
