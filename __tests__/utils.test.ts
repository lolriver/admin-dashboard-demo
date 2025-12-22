import { cn } from "@/lib/utils";

describe("cn utility function", () => {
    it("should merge class names correctly", () => {
        expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
        expect(cn("base", true && "active", false && "hidden")).toBe("base active");
    });

    it("should handle undefined and null values", () => {
        expect(cn("base", undefined, null, "end")).toBe("base end");
    });

    it("should merge tailwind classes correctly", () => {
        expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    });

    it("should handle empty input", () => {
        expect(cn()).toBe("");
    });

    it("should handle object syntax", () => {
        expect(cn({ active: true, disabled: false })).toBe("active");
    });
});
