import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import ChractersPerSecond from "../pages/subtitlingPage/subtitleSection/subtitleBox/bottomToolbar/ChractersPerSecond";

test("sends a text and time and expects correct cps", async () => {
  render(
    <Provider store={store}>
      <ChractersPerSecond
        text={"12345 \n12345"}
        time={{ start: 0, end: 1000 }}
      />
    </Provider>
  );

  const chip = screen.getByTitle("Chracters per second");

  expect(chip).toHaveTextContent("11");
});
