import { _saveQuestion, _saveQuestionAnswer } from "../helper/_DATA";

describe("_saveQuestion function", () => {
  test("should save a question and return the formatted question", async () => {
    const newQuestion = {
      optionOneText: "Option One Text",
      optionTwoText: "Option Two Text",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(newQuestion);

    expect(savedQuestion).toBeDefined();
    expect(savedQuestion.id).toBeDefined();
    expect(savedQuestion.timestamp).toBeDefined();
    expect(savedQuestion.optionOne.text).toBe("Option One Text");
    expect(savedQuestion.optionTwo.text).toBe("Option Two Text");
  });

  test("should reject and return an error if incorrect data is passed", async () => {
    const invalidQuestion = {
      id: "8xf0y6ziyjabvozdd253nd221",
      author: "sarahedo",
      timestamp: 1467166872634,
      optionTwo: {
        votes: [],
        text: "Build our new application with Typescript",
      },
    };

    try {
      await _saveQuestion(invalidQuestion);
    } catch (error) {
      expect(error).toBe(
        "Please provide optionOneText, optionTwoText, and author"
      );
    }
  });
});

describe("_saveQuestionAnswer function", () => {
  test("should save a question answer and return true", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionTwo";

    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(result).toBe(true);
  });

  test("should reject and return an error if incorrect data is passed", async () => {
    const invalidData = {
      authedUser: "sarahedo",
      answer: "optionOne",
    };
    try {
      await _saveQuestionAnswer(invalidData);
    } catch (error) {
      expect(error).toBe("Please provide authedUser, qid, and answer");
    }
  });
});
