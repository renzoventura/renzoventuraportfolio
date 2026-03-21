import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { SiteSwitcher } from "@/src/components/site-switcher";

describe("SiteSwitcher", () => {
  it("shows 'code' label when active is code", () => {
    render(<SiteSwitcher active="code" />);
    expect(screen.getByRole("button", { name: /code/i })).toBeInTheDocument();
  });

  it("shows 'film' label when active is photos", () => {
    render(<SiteSwitcher active="photos" />);
    expect(screen.getByRole("button", { name: /film/i })).toBeInTheDocument();
  });

  it("opens dropdown when button is clicked", () => {
    render(<SiteSwitcher active="code" />);
    expect(screen.queryByText("film")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("film")).toBeInTheDocument();
  });

  it("dropdown link points to /photo when active is code", () => {
    render(<SiteSwitcher active="code" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("link", { name: "film" })).toHaveAttribute("href", "/photo");
  });

  it("closes dropdown when clicked outside", () => {
    render(
      <div>
        <SiteSwitcher active="code" />
        <div data-testid="outside">outside</div>
      </div>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("film")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByText("film")).not.toBeInTheDocument();
  });

  it("closes dropdown when an option is clicked", () => {
    render(<SiteSwitcher active="code" />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("link", { name: "film" }));
    expect(screen.queryByRole("link", { name: "film" })).not.toBeInTheDocument();
  });
});
