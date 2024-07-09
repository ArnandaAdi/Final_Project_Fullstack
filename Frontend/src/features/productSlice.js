import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  order: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addToOrder: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.order.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const productToAdd = state.products.find((p) => p.id === productId);
        state.order.push({ ...productToAdd, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.order.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.order.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromOrder: (state, action) => {
      state.order = state.order.filter((i) => i.id !== action.payload);
    },
    resetOrder: (state) => {
      state.order = [];
    },
  },
});

export const {
  setProducts,
  setCategories,
  addToOrder,
  incrementQuantity,
  decrementQuantity,
  removeFromOrder,
  resetOrder,
} = productSlice.actions;

export default productSlice.reducer;
