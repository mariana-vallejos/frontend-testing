import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("changes on/off when is clicked", async () =>  {
    //Arrange
    render(<Toggle/>);

    // Act
    await userEvent.click(screen.getByRole("button", {name: "OFF"}))

    //Assert
    expect(screen.getByText('ON')).toBeInTheDocument()
  });
});