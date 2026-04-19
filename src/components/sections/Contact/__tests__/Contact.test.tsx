import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Contact } from "../Contact";
import { profile } from "@/content/profile";

describe("Contact", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Clipboard API is missing in jsdom; install a fresh mock per test.
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  it("renders the heading and pitch", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { level: 2, name: /let'?s talk/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/internships/i)).toBeInTheDocument();
  });

  it("renders a mailto link for the profile email", () => {
    render(<Contact />);
    const mailLink = screen.getByRole("link", { name: /email .+@/i });
    expect(mailLink).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("renders a GitHub chip as a link", () => {
    render(<Contact />);
    const gh = screen.getByRole("link", { name: /github/i });
    expect(gh).toBeInTheDocument();
  });

  it("renders a LinkedIn chip as a link", () => {
    render(<Contact />);
    const li = screen.getByRole("link", { name: /linkedin/i });
    expect(li).toBeInTheDocument();
  });

  it("exposes a copy-email button that is keyboard-reachable and copies on activation", async () => {
    // user-event 14 may install a fake clipboard during setup; install our
    // spy AFTER setup so it's the one the handler sees.
    const user = userEvent.setup();
    const spy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: spy },
    });

    render(<Contact />);
    const button = screen.getByRole("button", { name: /copy email address/i });
    expect(button).toBeInTheDocument();
    // Must not be removed from the natural tab order.
    expect(button).not.toHaveAttribute("tabindex", "-1");
    // Must be focusable — simulate focusing it the way a keyboard user would.
    button.focus();
    expect(button).toHaveFocus();

    await user.click(button);
    expect(spy).toHaveBeenCalledWith(profile.email);
  });

  it("flashes a Copied status after clicking the copy button", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const button = screen.getByRole("button", { name: /copy email address/i });
    await user.click(button);
    expect(await screen.findByRole("status")).toHaveTextContent(/copied/i);
  });
});
