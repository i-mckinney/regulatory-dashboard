import React from "react";
import { getByText, render, findByText, screen } from "@testing-library/react";
import HelixButton from "./index";
import "@testing-library/jest-dom/extend-expect";

it("is not disabled", async () => {
  const text = "Test Button Text2";
  // Render new instance in every test to prevent leaking state
  render(<HelixButton text={text} />);
  expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
});

it("passes in button text", async () => {
  const text = "Test Button Text";
  // Render new instance in every test to prevent leaking state
  render(<HelixButton text={text} />);
  expect(screen.getByRole("button")).toHaveTextContent("Test Button Text");
});
