import { describe, it, vi } from "vitest";
import * as utils from "../../utils";
import UserGreeting from "./UserGreeting";
import { render, screen } from "@testing-library/react";

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

        // Wait for greeting to appear
        const greetingEl = await screen.findByText("Hello, Jane!");
        expect(greetingEl).toBeInTheDocument();

        // Verify getUserGreeting was called with "Jane"
        expect(utils.getUserGreeting).toHaveBeenCalledWith("Jane");

        // Verify onGreet was called with "Hello, Jane!"
        expect(mockGreet).toHaveBeenCalledWith("Hello, Jane!");
    });
})