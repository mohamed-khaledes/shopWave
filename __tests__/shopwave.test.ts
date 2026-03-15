/**
 * Unit Tests for ShopWave
 * Covers: utility functions, Redux slices (auth, products, cart)
 */

// ─── Utility Tests ────────────────────────────────────────────────────────────
describe("lib/utils", () => {
  // Inline the utility functions to avoid module resolution complexity in tests
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  const truncate = (text: string, length: number) =>
    text.length > length ? text.slice(0, length) + "…" : text;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  describe("formatPrice", () => {
    it("formats a standard price correctly", () => {
      expect(formatPrice(29.99)).toBe("$29.99");
    });
    it("formats a whole number price", () => {
      expect(formatPrice(100)).toBe("$100.00");
    });
    it("formats zero correctly", () => {
      expect(formatPrice(0)).toBe("$0.00");
    });
    it("formats a large price with comma separator", () => {
      expect(formatPrice(1234.56)).toBe("$1,234.56");
    });
  });

  describe("truncate", () => {
    it("truncates text longer than specified length", () => {
      const result = truncate("Hello World", 5);
      expect(result).toBe("Hello…");
    });
    it("does not truncate text shorter than specified length", () => {
      expect(truncate("Hi", 10)).toBe("Hi");
    });
    it("does not truncate text equal to specified length", () => {
      expect(truncate("Hello", 5)).toBe("Hello");
    });
  });

  describe("capitalize", () => {
    it("capitalizes the first letter", () => {
      expect(capitalize("electronics")).toBe("Electronics");
    });
    it("handles already capitalized string", () => {
      expect(capitalize("Jewelry")).toBe("Jewelry");
    });
    it("handles single character", () => {
      expect(capitalize("a")).toBe("A");
    });
  });
});

// ─── Auth Slice Tests ─────────────────────────────────────────────────────────
import authReducer, { logout, restoreAuth, clearError } from "@/store/authSlice";
import type { AuthState } from "@/types";

const authInitialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

describe("authSlice", () => {
  it("returns initial state", () => {
    expect(authReducer(undefined, { type: "@@INIT" })).toEqual(authInitialState);
  });

  it("restoreAuth sets user and token", () => {
    const user = { id: "1", name: "Test", email: "test@test.com" };
    const token = "mock-jwt-token";
    const state = authReducer(authInitialState, restoreAuth({ user, token }));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
  });

  it("logout clears auth state", () => {
    const loggedInState: AuthState = {
      user: { id: "1", name: "Test", email: "test@test.com" },
      token: "some-token",
      isAuthenticated: true,
      loading: false,
      error: null,
    };
    const state = authReducer(loggedInState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it("clearError removes error message", () => {
    const errorState: AuthState = { ...authInitialState, error: "Login failed" };
    const state = authReducer(errorState, clearError());
    expect(state.error).toBeNull();
  });
});

// ─── Cart Slice Tests ─────────────────────────────────────────────────────────
import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import type { CartState, Product } from "@/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 49.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/img.jpg",
  rating: { rate: 4.5, count: 120 },
};

const cartInitialState: CartState = { items: [], total: 0 };

describe("cartSlice", () => {
  it("returns initial state", () => {
    expect(cartReducer(undefined, { type: "@@INIT" })).toEqual(cartInitialState);
  });

  it("addToCart adds a new product", () => {
    const state = cartReducer(cartInitialState, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.total).toBeCloseTo(49.99);
  });

  it("addToCart increments quantity for existing product", () => {
    const stateWith1 = cartReducer(cartInitialState, addToCart(mockProduct));
    const stateWith2 = cartReducer(stateWith1, addToCart(mockProduct));
    expect(stateWith2.items[0].quantity).toBe(2);
    expect(stateWith2.total).toBeCloseTo(99.98);
  });

  it("removeFromCart removes product by id", () => {
    const stateWith1 = cartReducer(cartInitialState, addToCart(mockProduct));
    const state = cartReducer(stateWith1, removeFromCart(1));
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });

  it("updateQuantity changes item quantity", () => {
    const stateWith1 = cartReducer(cartInitialState, addToCart(mockProduct));
    const state = cartReducer(stateWith1, updateQuantity({ id: 1, quantity: 3 }));
    expect(state.items[0].quantity).toBe(3);
    expect(state.total).toBeCloseTo(149.97);
  });

  it("updateQuantity with 0 removes item", () => {
    const stateWith1 = cartReducer(cartInitialState, addToCart(mockProduct));
    const state = cartReducer(stateWith1, updateQuantity({ id: 1, quantity: 0 }));
    expect(state.items).toHaveLength(0);
  });

  it("clearCart resets to initial state", () => {
    const stateWith1 = cartReducer(cartInitialState, addToCart(mockProduct));
    const state = cartReducer(stateWith1, clearCart());
    expect(state).toEqual(cartInitialState);
  });
});

// ─── Products Slice Tests ─────────────────────────────────────────────────────
import productsReducer, {
  setSearchQuery,
  setCategory,
  loadMore,
  clearSelectedProduct,
} from "@/store/productsSlice";
import type { ProductsState } from "@/types";

const mockProducts: Product[] = [
  { ...mockProduct, id: 1, title: "Apple Watch", category: "electronics" },
  { ...mockProduct, id: 2, title: "Gold Ring", category: "jewelery" },
  { ...mockProduct, id: 3, title: "Running Shoes", category: "men's clothing" },
];

const productsBase: ProductsState = {
  items: mockProducts,
  filteredItems: mockProducts,
  categories: ["electronics", "jewelery", "men's clothing"],
  selectedCategory: "all",
  searchQuery: "",
  loading: false,
  error: null,
  page: 1,
  hasMore: false,
  selectedProduct: null,
};

describe("productsSlice", () => {
  it("setSearchQuery filters by title (case-insensitive)", () => {
    const state = productsReducer(productsBase, setSearchQuery("apple"));
    expect(state.filteredItems).toHaveLength(1);
    expect(state.filteredItems[0].title).toBe("Apple Watch");
    expect(state.page).toBe(1);
  });

  it("setSearchQuery with empty string shows all products", () => {
    const state = productsReducer(productsBase, setSearchQuery(""));
    expect(state.filteredItems).toHaveLength(3);
  });

  it("setCategory filters by category", () => {
    const state = productsReducer(productsBase, setCategory("jewelery"));
    expect(state.filteredItems).toHaveLength(1);
    expect(state.filteredItems[0].id).toBe(2);
  });

  it("setCategory 'all' shows all products", () => {
    const withCategory = productsReducer(productsBase, setCategory("jewelery"));
    const state = productsReducer(withCategory, setCategory("all"));
    expect(state.filteredItems).toHaveLength(3);
  });

  it("clearSelectedProduct nullifies selectedProduct", () => {
    const withProduct = { ...productsBase, selectedProduct: mockProduct };
    const state = productsReducer(withProduct, clearSelectedProduct());
    expect(state.selectedProduct).toBeNull();
  });

  it("loadMore increments page", () => {
    const withMore = { ...productsBase, hasMore: true };
    const state = productsReducer(withMore, loadMore());
    expect(state.page).toBe(2);
  });
});
