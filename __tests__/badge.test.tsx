import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "@/components/badge";

describe("Badge Component", () => {
    it("renders with default variant", () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("renders with success variant", () => {
        render(<Badge variant="success">Active</Badge>);
        const badge = screen.getByText("Active");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-green-500/15");
    });

    it("renders with warning variant", () => {
        render(<Badge variant="warning">Pending</Badge>);
        const badge = screen.getByText("Pending");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-yellow-500/15");
    });

    it("renders with destructive variant", () => {
        render(<Badge variant="destructive">Error</Badge>);
        const badge = screen.getByText("Error");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-red-500/15");
    });

    it("applies custom className", () => {
        render(<Badge className="custom-class">Custom</Badge>);
        const badge = screen.getByText("Custom");
        expect(badge).toHaveClass("custom-class");
    });
});
