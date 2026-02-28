import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/data-display/stat-card";
import { SparkBar } from "@/components/data-display/spark-bar";
import { OfferCard } from "@/components/data-display/offer-card";

// ================================================================
// StatCard
// ================================================================

describe("StatCard", () => {
  it("renders the label text", () => {
    render(<StatCard value="42" label="Visits" />);
    expect(screen.getByText("Visits")).toBeInTheDocument();
  });

  it("renders the value text", () => {
    render(<StatCard value="1,234" label="Revenue" />);
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("does not render progress bar when progress is undefined", () => {
    const { container } = render(<StatCard value="50" label="Score" />);
    // The progress wrapper div has a specific class; when no progress, it shouldn't exist
    const bars = container.querySelectorAll(".bg-primary");
    expect(bars.length).toBe(0);
  });

  describe("progress clamping", () => {
    function getBarWidth(progress: number): string {
      const { container } = render(
        <StatCard value="X" label="L" progress={progress} />,
      );
      const bar = container.querySelector(".bg-primary.h-full") as HTMLElement;
      return bar?.style.width ?? "";
    }

    it("clamps negative progress to 0%", () => {
      expect(getBarWidth(-10)).toBe("0%");
    });

    it("renders 0% at progress=0", () => {
      expect(getBarWidth(0)).toBe("0%");
    });

    it("renders 50% at progress=50", () => {
      expect(getBarWidth(50)).toBe("50%");
    });

    it("renders 100% at progress=100", () => {
      expect(getBarWidth(100)).toBe("100%");
    });

    it("clamps progress above 100 to 100%", () => {
      expect(getBarWidth(150)).toBe("100%");
    });
  });

  it("renders an icon when provided", () => {
    render(
      <StatCard
        value="7"
        label="Stars"
        icon={<span data-testid="icon">star</span>}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});

// ================================================================
// SparkBar
// ================================================================

describe("SparkBar", () => {
  it('has role="meter"', () => {
    render(<SparkBar percent={50} />);
    expect(screen.getByRole("meter")).toBeInTheDocument();
  });

  it("sets aria-valuenow to clamped percent", () => {
    render(<SparkBar percent={75} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "75");
  });

  it("sets aria-valuemin to 0 and aria-valuemax to 100", () => {
    render(<SparkBar percent={50} />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
  });

  describe("percent clamping", () => {
    it("clamps negative percent to 0", () => {
      render(<SparkBar percent={-20} />);
      expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "0");
    });

    it("clamps percent above 100 to 100", () => {
      render(<SparkBar percent={200} />);
      expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "100");
    });

    it("passes through values in range", () => {
      render(<SparkBar percent={42} />);
      expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "42");
    });
  });

  it("sets --bar-pct CSS variable to clamped value", () => {
    render(<SparkBar percent={65} />);
    const meter = screen.getByRole("meter");
    expect(meter.style.getPropertyValue("--bar-pct")).toBe("65%");
  });
});

// ================================================================
// OfferCard
// ================================================================

describe("OfferCard", () => {
  it("renders the offer value", () => {
    render(<OfferCard offerValue="20% OFF" title="Summer Sale" />);
    expect(screen.getByText("20% OFF")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<OfferCard offerValue="$15" title="Birthday Coupon" />);
    expect(screen.getByText("Birthday Coupon")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <OfferCard
        offerValue="$5"
        title="Promo"
        description="Valid on facials only"
      />,
    );
    expect(screen.getByText("Valid on facials only")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(
      <OfferCard offerValue="$5" title="Promo" />,
    );
    expect(container.querySelector(".text-xs.text-text-secondary")).toBeNull();
  });

  describe("expiry states", () => {
    function getExpiryBar(percent: number) {
      const { container } = render(
        <OfferCard
          offerValue="X"
          title="T"
          expiryPercent={percent}
          expiryLabel="Expires soon"
        />,
      );
      return container.querySelector(
        ".h-full.rounded-full",
      ) as HTMLElement;
    }

    it("uses accent color when expiryPercent > 20 (normal state)", () => {
      const bar = getExpiryBar(50);
      expect(bar.className).toContain("bg-accent");
      expect(bar.className).not.toContain("bg-warning");
      expect(bar.className).not.toContain("bg-error");
    });

    it("uses warning color when expiryPercent is exactly 20 (isLow)", () => {
      const bar = getExpiryBar(20);
      expect(bar.className).toContain("bg-warning");
      expect(bar.className).not.toContain("bg-error");
    });

    it("uses warning color when expiryPercent is between 6 and 20 (isLow, not critical)", () => {
      const bar = getExpiryBar(10);
      expect(bar.className).toContain("bg-warning");
    });

    it("uses error color when expiryPercent is exactly 5 (isCritical)", () => {
      const bar = getExpiryBar(5);
      expect(bar.className).toContain("bg-error");
    });

    it("uses error color when expiryPercent is below 5 (isCritical)", () => {
      const bar = getExpiryBar(2);
      expect(bar.className).toContain("bg-error");
    });

    it("applies expiry-pulse animation when critical", () => {
      const bar = getExpiryBar(3);
      expect(bar.style.animation).toContain("expiry-pulse");
    });

    it("does not apply expiry-pulse animation when not critical", () => {
      const bar = getExpiryBar(15);
      expect(bar.style.animation).toBe("");
    });
  });

  describe("expiry bar width clamping", () => {
    function getBarWidth(percent: number) {
      const { container } = render(
        <OfferCard offerValue="X" title="T" expiryPercent={percent} />,
      );
      const bar = container.querySelector(
        ".h-full.rounded-full",
      ) as HTMLElement;
      return bar?.style.width ?? "";
    }

    it("clamps negative to 0%", () => {
      expect(getBarWidth(-5)).toBe("0%");
    });

    it("clamps above 100 to 100%", () => {
      expect(getBarWidth(120)).toBe("100%");
    });

    it("renders exact value when in range", () => {
      expect(getBarWidth(73)).toBe("73%");
    });
  });

  it("renders expiry label text", () => {
    render(
      <OfferCard
        offerValue="X"
        title="T"
        expiryPercent={50}
        expiryLabel="3 days left"
      />,
    );
    expect(screen.getByText("3 days left")).toBeInTheDocument();
  });

  it("does not render expiry section when expiryPercent is undefined", () => {
    const { container } = render(
      <OfferCard offerValue="X" title="T" />,
    );
    expect(container.querySelector(".bg-surface-sunken")).toBeNull();
  });
});
