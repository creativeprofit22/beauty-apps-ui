import { render, screen, act } from "@testing-library/react";
import { StampCard } from "@/components/engagement/stamp-card";
import { TierUpgrade } from "@/components/engagement/tier-upgrade";

// ================================================================
// StampCard
// ================================================================

describe("StampCard", () => {
  it("renders the correct number of cells (default total=10)", () => {
    const { container } = render(<StampCard earned={3} />);
    // Each stamp is a direct child div of the grid
    const cells = container.querySelectorAll("[role='img'] > div");
    expect(cells.length).toBe(10);
  });

  it("renders the correct number of cells with custom total", () => {
    const { container } = render(<StampCard earned={2} total={8} />);
    const cells = container.querySelectorAll("[role='img'] > div");
    expect(cells.length).toBe(8);
  });

  it("renders check marks (svg) for earned cells", () => {
    const { container } = render(<StampCard earned={4} total={6} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(4);
  });

  it("earned cells have accent background class", () => {
    const { container } = render(<StampCard earned={2} total={5} />);
    const cells = container.querySelectorAll("[role='img'] > div");

    // First 2 cells should have bg-accent
    expect(cells[0]!.className).toContain("bg-accent");
    expect(cells[1]!.className).toContain("bg-accent");
    // Cell at index 2 (next) should NOT have bg-accent
    expect(cells[2]!.className).not.toContain("bg-accent");
  });

  it("next cell (index === earned) has dashed border-accent class", () => {
    const { container } = render(<StampCard earned={3} total={6} />);
    const cells = container.querySelectorAll("[role='img'] > div");
    const nextCell = cells[3]!;

    expect(nextCell.className).toContain("border-dashed");
    expect(nextCell.className).toContain("border-accent");
  });

  it("next cell has pulse animation style", () => {
    const { container } = render(<StampCard earned={2} total={5} />);
    const cells = container.querySelectorAll("[role='img'] > div");
    const nextCell = cells[2] as HTMLElement;

    expect(nextCell.style.animation).toContain("stamp-pulse");
  });

  it("future cells (beyond next) have muted border", () => {
    const { container } = render(<StampCard earned={1} total={5} />);
    const cells = container.querySelectorAll("[role='img'] > div");

    // Index 0 = earned, index 1 = next, index 2+ = future
    const futureCell = cells[2]!;
    expect(futureCell.className).toContain("border-border-muted");
  });

  it("sets accessible aria-label with earned and total", () => {
    render(<StampCard earned={5} total={10} />);
    expect(
      screen.getByRole("img", { name: "Stamp card: 5 of 10 stamps earned" }),
    ).toBeInTheDocument();
  });

  it("when all stamps are earned, no cell has pulse animation", () => {
    const { container } = render(<StampCard earned={5} total={5} />);
    const cells = container.querySelectorAll("[role='img'] > div");

    for (const cell of cells) {
      expect((cell as HTMLElement).style.animation).toBe("");
    }
  });
});

// ================================================================
// TierUpgrade
// ================================================================

describe("TierUpgrade", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("lookup objects", () => {
    // We test the label and gradient maps indirectly through rendering.
    it("renders correct tier label for bronze", () => {
      render(<TierUpgrade active tier="bronze" />);
      expect(screen.getByText("Bronze")).toBeInTheDocument();
    });

    it("renders correct tier label for silver", () => {
      render(<TierUpgrade active tier="silver" />);
      expect(screen.getByText("Silver")).toBeInTheDocument();
    });

    it("renders correct tier label for gold", () => {
      render(<TierUpgrade active tier="gold" />);
      expect(screen.getByText("Gold")).toBeInTheDocument();
    });

    it("renders correct tier label for black", () => {
      render(<TierUpgrade active tier="black" />);
      expect(screen.getByText("Black Diamond")).toBeInTheDocument();
    });

    it('always shows "Tier Unlocked" subtitle', () => {
      render(<TierUpgrade active tier="gold" />);
      expect(screen.getByText("Tier Unlocked")).toBeInTheDocument();
    });
  });

  describe("phase state machine", () => {
    it("renders nothing when active=false (idle phase)", () => {
      const { container } = render(
        <TierUpgrade active={false} tier="gold" />,
      );
      // When phase is "idle", component returns null
      expect(container.querySelector("[role='status']")).toBeNull();
    });

    it("renders overlay when active=true (enters wash phase)", () => {
      render(<TierUpgrade active tier="gold" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("transitions to badge phase after 600ms", () => {
      const { container } = render(
        <TierUpgrade active tier="silver" />,
      );

      // Initially in wash phase — badge container should have scale-50 opacity-0
      const badgeContainer = container.querySelector(".relative.z-10") as HTMLElement;
      expect(badgeContainer.className).toContain("scale-50");

      act(() => {
        vi.advanceTimersByTime(600);
      });

      // After 600ms, should be in badge phase — scale-100 opacity-100
      expect(badgeContainer.className).toContain("scale-100");
      expect(badgeContainer.className).toContain("opacity-100");
    });

    it("transitions to out phase before dismiss", () => {
      const dismissDelay = 3000;
      const { container } = render(
        <TierUpgrade active tier="gold" dismissDelay={dismissDelay} />,
      );

      act(() => {
        // Advance to out phase (dismissDelay - 400 = 2600ms)
        vi.advanceTimersByTime(2600);
      });

      const badgeContainer = container.querySelector(".relative.z-10") as HTMLElement;
      expect(badgeContainer.className).toContain("scale-110");
      expect(badgeContainer.className).toContain("opacity-0");
    });

    it("calls onDismiss and returns to idle after full dismissDelay", () => {
      const onDismiss = vi.fn();
      const { container } = render(
        <TierUpgrade
          active
          tier="bronze"
          dismissDelay={3000}
          onDismiss={onDismiss}
        />,
      );

      // Initially visible
      expect(screen.getByRole("status")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // onDismiss should be called
      expect(onDismiss).toHaveBeenCalledTimes(1);

      // Component should return null (idle phase)
      expect(container.querySelector("[role='status']")).toBeNull();
    });

    it("resets to idle when active is set to false mid-animation", () => {
      const { container, rerender } = render(
        <TierUpgrade active tier="gold" />,
      );

      // Should be visible
      expect(screen.getByRole("status")).toBeInTheDocument();

      // Deactivate
      rerender(<TierUpgrade active={false} tier="gold" />);

      // Should return null
      expect(container.querySelector("[role='status']")).toBeNull();
    });

    it("uses custom dismissDelay timing", () => {
      const onDismiss = vi.fn();
      render(
        <TierUpgrade
          active
          tier="silver"
          dismissDelay={5000}
          onDismiss={onDismiss}
        />,
      );

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should NOT have dismissed yet
      expect(onDismiss).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Now it should dismiss at 5000ms
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
