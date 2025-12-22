import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProgressBar } from "@/components/progress-bar";

describe("ProgressBar Component", () => {
    it("renders with 0% progress", () => {
        render(<ProgressBar value={0} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute("aria-valuenow", "0");
    });

    it("renders with 50% progress", () => {
        render(<ProgressBar value={50} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    });

    it("renders with 100% progress", () => {
        render(<ProgressBar value={100} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("aria-valuenow", "100");
    });

    it("applies custom className", () => {
        const { container } = render(<ProgressBar value={25} className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
