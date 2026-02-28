import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("returns a single class string as-is", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("joins multiple class strings with a space", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("filters out false", () => {
    expect(cn("foo", false, "bar")).toBe("foo bar");
  });

  it("filters out null", () => {
    expect(cn("foo", null, "bar")).toBe("foo bar");
  });

  it("filters out undefined", () => {
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
  });

  it("filters out empty string", () => {
    // Boolean("") is false, so "" is filtered
    expect(cn("foo", "", "bar")).toBe("foo bar");
  });

  it("filters a mix of falsy values among valid strings", () => {
    expect(cn("a", false, null, "b", undefined, "", "c")).toBe("a b c");
  });

  it("returns empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });

  it("returns empty string when all arguments are falsy", () => {
    expect(cn(false, null, undefined, "")).toBe("");
  });

  it("preserves internal whitespace within class strings", () => {
    // cn does not trim individual strings — it only joins with " "
    expect(cn("  foo  ", "bar")).toBe("  foo   bar");
  });
});
