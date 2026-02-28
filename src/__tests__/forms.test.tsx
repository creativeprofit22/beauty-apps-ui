import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "@/components/forms/field";
import { SlotGrid } from "@/components/forms/slot-grid";

// ================================================================
// Field
// ================================================================

describe("Field", () => {
  describe("fieldId generation", () => {
    it('generates id from label: "Full Name" -> "field-full-name"', () => {
      render(<Field label="Full Name" />);
      const input = screen.getByLabelText("Full Name");
      expect(input.id).toBe("field-full-name");
    });

    it('generates id from label: "Email Address" -> "field-email-address"', () => {
      render(<Field label="Email Address" />);
      const input = screen.getByLabelText("Email Address");
      expect(input.id).toBe("field-email-address");
    });

    it("uses explicit id when provided", () => {
      render(<Field label="Phone" id="custom-phone" />);
      const input = screen.getByLabelText("Phone");
      expect(input.id).toBe("custom-phone");
    });

    it("collapses multiple spaces into single hyphens", () => {
      render(<Field label="First   Last" />);
      const input = screen.getByLabelText(/First\s+Last/);
      expect(input.id).toBe("field-first-last");
    });
  });

  describe("error display", () => {
    it('shows error message with role="alert"', () => {
      render(<Field label="Email" error="Invalid email" />);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Invalid email");
    });

    it("does not render error element when no error", () => {
      render(<Field label="Email" />);
      expect(screen.queryByRole("alert")).toBeNull();
    });

    it("sets aria-invalid on input when error is present", () => {
      render(<Field label="Name" error="Required" />);
      const input = screen.getByLabelText("Name");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when no error", () => {
      render(<Field label="Name" />);
      const input = screen.getByLabelText("Name");
      expect(input).not.toHaveAttribute("aria-invalid");
    });

    it("links input to error via aria-describedby", () => {
      render(<Field label="Phone" error="Too short" />);
      const input = screen.getByLabelText("Phone");
      const errorId = "field-phone-error";
      expect(input.getAttribute("aria-describedby")).toContain(errorId);
      expect(screen.getByRole("alert").id).toBe(errorId);
    });
  });

  describe("description", () => {
    it("renders description text", () => {
      render(<Field label="Bio" description="Tell us about yourself" />);
      expect(screen.getByText("Tell us about yourself")).toBeInTheDocument();
    });

    it("links input to description via aria-describedby", () => {
      render(<Field label="Bio" description="Short bio" />);
      const input = screen.getByLabelText("Bio");
      expect(input.getAttribute("aria-describedby")).toContain(
        "field-bio-desc",
      );
    });

    it("does not render description when not provided", () => {
      const { container } = render(<Field label="Name" />);
      expect(container.querySelector("[id$='-desc']")).toBeNull();
    });

    it("combines description and error in aria-describedby", () => {
      render(
        <Field
          label="Email"
          description="We'll never share it"
          error="Invalid"
        />,
      );
      const input = screen.getByLabelText("Email");
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("field-email-desc");
      expect(describedBy).toContain("field-email-error");
    });
  });

  describe("prefix and suffix padding", () => {
    it("adds pl-9 class when prefix is provided", () => {
      render(<Field label="Amount" prefix={<span>$</span>} />);
      const input = screen.getByLabelText("Amount");
      expect(input.className).toContain("pl-9");
    });

    it("does not add pl-9 when no prefix", () => {
      render(<Field label="Amount" />);
      const input = screen.getByLabelText("Amount");
      expect(input.className).not.toContain("pl-9");
    });

    it("adds pr-9 class when suffix is provided", () => {
      render(<Field label="Weight" suffix={<span>kg</span>} />);
      const input = screen.getByLabelText("Weight");
      expect(input.className).toContain("pr-9");
    });

    it("does not add pr-9 when no suffix", () => {
      render(<Field label="Weight" />);
      const input = screen.getByLabelText("Weight");
      expect(input.className).not.toContain("pr-9");
    });

    it("adds both pl-9 and pr-9 when prefix and suffix are provided", () => {
      render(
        <Field
          label="Price"
          prefix={<span>$</span>}
          suffix={<span>.00</span>}
        />,
      );
      const input = screen.getByLabelText("Price");
      expect(input.className).toContain("pl-9");
      expect(input.className).toContain("pr-9");
    });
  });

  it("renders the label text", () => {
    render(<Field label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("passes through standard input attributes", () => {
    render(
      <Field label="Email" type="email" placeholder="you@example.com" />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
  });
});

// ================================================================
// SlotGrid
// ================================================================

describe("SlotGrid", () => {
  const sampleSlots = [
    { id: "1", time: "9:00 AM", status: "available" as const },
    { id: "2", time: "10:00 AM", status: "unavailable" as const },
    { id: "3", time: "11:00 AM", status: "selected" as const },
    { id: "4", time: "12:00 PM", status: "available" as const },
  ];

  it("renders all slot buttons", () => {
    render(<SlotGrid slots={sampleSlots} />);
    expect(screen.getByText("9:00 AM")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("11:00 AM")).toBeInTheDocument();
    expect(screen.getByText("12:00 PM")).toBeInTheDocument();
  });

  it('has a listbox role with "Available time slots" label', () => {
    render(<SlotGrid slots={sampleSlots} />);
    expect(
      screen.getByRole("listbox", { name: "Available time slots" }),
    ).toBeInTheDocument();
  });

  it("available slot is not disabled", () => {
    render(<SlotGrid slots={sampleSlots} />);
    const slot = screen.getByText("9:00 AM");
    expect(slot).not.toBeDisabled();
  });

  it("unavailable slot is disabled", () => {
    render(<SlotGrid slots={sampleSlots} />);
    const slot = screen.getByText("10:00 AM");
    expect(slot).toBeDisabled();
  });

  it("unavailable slot has aria-disabled", () => {
    render(<SlotGrid slots={sampleSlots} />);
    const slot = screen.getByText("10:00 AM");
    expect(slot).toHaveAttribute("aria-disabled", "true");
  });

  it('selected slot has aria-selected="true"', () => {
    render(<SlotGrid slots={sampleSlots} />);
    const slot = screen.getByText("11:00 AM");
    expect(slot).toHaveAttribute("aria-selected", "true");
  });

  it('available slot has aria-selected="false"', () => {
    render(<SlotGrid slots={sampleSlots} />);
    const slot = screen.getByText("9:00 AM");
    expect(slot).toHaveAttribute("aria-selected", "false");
  });

  it("calls onSelect with slot id when available slot is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SlotGrid slots={sampleSlots} onSelect={onSelect} />);

    await user.click(screen.getByText("9:00 AM"));
    expect(onSelect).toHaveBeenCalledWith("1");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("does not call onSelect when unavailable slot is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SlotGrid slots={sampleSlots} onSelect={onSelect} />);

    await user.click(screen.getByText("10:00 AM"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders empty grid when no slots provided", () => {
    const { container } = render(<SlotGrid slots={[]} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(0);
  });

  it("each slot has role='option'", () => {
    render(<SlotGrid slots={sampleSlots} />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(4);
  });
});
