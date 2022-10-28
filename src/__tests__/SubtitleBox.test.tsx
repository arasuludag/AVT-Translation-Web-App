import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import SubtitleBox from "../features/subtitleSection/subtitleBox/SubtitleBox";

test("renders a subtitle box and expects placeholder texts", async () => {
  render(
    <Provider store={store}>
      <SubtitleBox
        subtitle={{
          id: 0,
          text: "TEST",
          note: "Note",
          start_time: 1000,
          end_time: 2000,
          position: 1,
        }}
        readOnly={true}
      />
    </Provider>
  );

  const editor = screen.getByText("TEST");
  const startInput = screen.getByDisplayValue("1000");
  const endInput = screen.getByDisplayValue("2000");

  expect(editor).toBeInTheDocument();
  expect(startInput).toBeInTheDocument();
  expect(endInput).toBeInTheDocument();
});
