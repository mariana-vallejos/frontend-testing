import { describe, it, vi } from "vitest";
import * as utils from "../../utils";
import UserGreeting from "./UserGreeting";
import { render, screen, waitFor } from "@testing-library/react";

describe('User greeting with successful scenario', () => {
    const mockGreet = vi.fn(() => 'onGreet mocked')

    beforeEach(() => {
        vi.resetAllMocks();

        // Stub
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "Jane" }),
        } as Response)))

        // Mock getUserGreeting
        vi.spyOn(utils, "getUserGreeting").mockReturnValue("Hello, Jane!");
    });

    it("renders greeting and calls onGreet with 'Hello, Jane!'", async () => {
        render(<UserGreeting userId="123" onGreet={mockGreet} />);

        const greetingEl = await screen.findByText("Hello, Jane!");
        expect(greetingEl).toBeInTheDocument();

        expect(utils.getUserGreeting).toHaveBeenCalledWith("Jane");

        expect(mockGreet).toHaveBeenCalledWith("Hello, Jane!");
    });
})

describe("UserGreeting with error scenario", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows error message and does not call onGreet when fetch fails", async () => {
    // Mock fetch to reject
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const onGreet = vi.fn();

    render(<UserGreeting userId="123" onGreet={onGreet} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Failed to load greeting.")
    });

    expect(onGreet).not.toHaveBeenCalled();
  });
});