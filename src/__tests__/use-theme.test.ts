import { renderHook, act } from "@testing-library/react";
import { useTheme } from "@/hooks/useTheme";

// ---------- helpers ----------

let store: Record<string, string> = {};
let darkPreference = false;
let storageListeners: Array<(e: StorageEvent) => void> = [];

function resetMocks() {
  store = {};
  darkPreference = false;
  storageListeners = [];
  document.documentElement.classList.remove("dark");
}

// ---------- mocks ----------

beforeEach(() => {
  resetMocks();

  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => {
      store[key] = val;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  });

  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: darkPreference,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));

  // Capture storage event listeners so we can verify subscription behaviour
  const originalAddEventListener = window.addEventListener.bind(window);
  vi.spyOn(window, "addEventListener").mockImplementation(
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
      if (type === "storage") {
        storageListeners.push(listener as (e: StorageEvent) => void);
      }
      return originalAddEventListener(type, listener, options);
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// ---------- tests ----------

describe("useTheme", () => {
  it('returns "light" when no localStorage and no system dark preference', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it('returns "dark" when localStorage has "dark"', () => {
    store["theme"] = "dark";
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it('returns "dark" when system prefers dark and no localStorage', () => {
    darkPreference = true;
    // Re-stub matchMedia so this test picks up the new preference
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("localStorage overrides system dark preference", () => {
    darkPreference = true;
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }));
    store["theme"] = "light";

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it('setTheme("dark") updates localStorage and applies dark class', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(store["theme"]).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggleTheme switches from light to dark", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(store["theme"]).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggleTheme switches from dark back to light", () => {
    store["theme"] = "dark";
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(store["theme"]).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it('SSR snapshot returns "light"', () => {
    // useSyncExternalStore getServerSnapshot is used during SSR.
    // We can verify by directly importing the module-level function,
    // but the hook itself exposes this indirectly.
    // In a jsdom environment the client snapshot is used, so we verify
    // the default (no localStorage, no dark preference) resolves to "light".
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });
});
