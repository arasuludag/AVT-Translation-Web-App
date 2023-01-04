import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CharacterPerLine from "../pages/subtitlingPage/subtitleSection/subtitleBox/ChractersPerLine";

test("sends a text and expects correct cpl chips", async () => {
  render(
    <Provider store={store}>
      <CharacterPerLine text={"123\n12345"} />
    </Provider>
  );

  const chips = screen.queryAllByTitle("Chracters per line");

  expect(chips[0]).toHaveTextContent("3");
  expect(chips[1]).toHaveTextContent("5");
});

test("sends empty text and expects no cpl chips", async () => {
  render(
    <Provider store={store}>
      <CharacterPerLine text={""} />
    </Provider>
  );

  const chip = screen.queryByTitle("Chracters per line");

  expect(chip).toBeNull();
});
