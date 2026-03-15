import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { ProductsState, Product } from "@/types";
import { productsApi } from "@/lib/apiClient";

const PAGE_SIZE = 8;

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: [],
  selectedCategory: "all",
  searchQuery: "",
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  selectedProduct: null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/** Fetch all products from FakeStore API */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsApi.getAll(),
        productsApi.getCategories(),
      ]);
      return { products: productsRes.data as Product[], categories: categoriesRes.data as string[] };
    } catch {
      return rejectWithValue("Failed to fetch products. Please try again.");
    }
  }
);

/** Fetch single product by ID */
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await productsApi.getById(id);
      return res.data as Product;
    } catch {
      return rejectWithValue("Product not found.");
    }
  }
);

// ─── Helper: apply filters ────────────────────────────────────────────────────
function applyFilters(
  items: Product[],
  query: string,
  category: string
): Product[] {
  return items.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });
}

// ─── Slice ────────────────────────────────────────────────────────────────────
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.page = 1;
      state.filteredItems = applyFilters(state.items, action.payload, state.selectedCategory);
      state.hasMore = state.filteredItems.length > PAGE_SIZE;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      state.page = 1;
      state.filteredItems = applyFilters(state.items, state.searchQuery, action.payload);
      state.hasMore = state.filteredItems.length > PAGE_SIZE;
    },
    /** Increment page for infinite scroll */
    loadMore(state) {
      const nextPage = state.page + 1;
      const total = state.filteredItems.length;
      if (nextPage * PAGE_SIZE < total) {
        state.page = nextPage;
      } else {
        state.page = nextPage;
        state.hasMore = false;
      }
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.categories = action.payload.categories;
        state.filteredItems = action.payload.products;
        state.hasMore = action.payload.products.length > PAGE_SIZE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const PAGE_SIZE_EXPORT = PAGE_SIZE;
export const { setSearchQuery, setCategory, loadMore, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
