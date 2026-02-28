import { renderHook, act } from "@testing-library/react";
import { useScratch } from "@/hooks/useScratch";

// ---------- canvas mock ----------

const mockCtx = {
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({
    data: new Uint8ClampedArray(400),
  })),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  set globalCompositeOperation(_v: string) {},
  set fillStyle(_v: string | CanvasGradient) {},
};

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCtx) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

afterAll(() => {
  vi.restoreAllMocks();
});

// ---------- helpers ----------

const defaultOpts = {
  width: 200,
  height: 100,
  foilGradient: ["#c0c0c0", "#e0e0e0", "#c0c0c0"] as const,
};

// ---------- tests ----------

describe("useScratch", () => {
  it("returns the expected shape", () => {
    const { result } = renderHook(() => useScratch(defaultOpts));

    expect(result.current).toHaveProperty("canvasRef");
    expect(result.current).toHaveProperty("isComplete");
    expect(result.current).toHaveProperty("progress");
    expect(result.current).toHaveProperty("reset");
  });

  it("initializes isComplete as false", () => {
    const { result } = renderHook(() => useScratch(defaultOpts));
    expect(result.current.isComplete).toBe(false);
  });

  it("initializes progress as 0", () => {
    const { result } = renderHook(() => useScratch(defaultOpts));
    expect(result.current.progress).toBe(0);
  });

  it("reset is a callable function", () => {
    const { result } = renderHook(() => useScratch(defaultOpts));
    expect(typeof result.current.reset).toBe("function");

    // Calling reset should not throw even without a real canvas attached
    act(() => {
      result.current.reset();
    });
  });

  it("canvasRef is a ref object with null initial value", () => {
    const { result } = renderHook(() => useScratch(defaultOpts));
    expect(result.current.canvasRef).toBeDefined();
    expect(result.current.canvasRef.current).toBeNull();
  });

  it("accepts custom brushRadius and completeThreshold", () => {
    const { result } = renderHook(() =>
      useScratch({
        ...defaultOpts,
        brushRadius: 30,
        completeThreshold: 0.5,
      }),
    );

    // Hook should initialize without error
    expect(result.current.isComplete).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it("accepts an onComplete callback without error", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useScratch({ ...defaultOpts, onComplete }),
    );

    expect(result.current.isComplete).toBe(false);
    // onComplete should not have been called on init
    expect(onComplete).not.toHaveBeenCalled();
  });
});
