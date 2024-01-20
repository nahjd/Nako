import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(`http://localhost:5050/products`);
  return response.data;
});

export const fetchDelete = createAsyncThunk("data/fetchDelete", async (id) => {
  const response = await axios.delete(`http://localhost:5050/products/` + id);
  return response.data;
});

export const fetchPost = createAsyncThunk("data/fetchPost", async (item) => {
  const response = await axios.post(`http://localhost:5050/products`, item);
  return response.data;
});

export const userSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    basket: [],
    wishlist: [],
  },
  reducers: {
    addWishlist: (state, action) => {
      let found = state.wishlist.find((item) => item._id == action.payload._id);
      if (found) {
        state.wishlist = current(state.wishlist).filter(
          (item) => item._id != action.payload._id
        );
      } else {
        state.wishlist = [...current(state.wishlist), action.payload];
      }
    },

    deleteWishlist: (state, action) => {
      state.wishlist = current(state.wishlist).filter(
        (item) => item._id != action.payload._id
      );
    },

    addBasket: (state, action) => {
      let foundIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      if (foundIndex !== -1) {
        state.basket = current(state.basket).map((item, index) =>
          index === foundIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.basket = [
          ...current(state.basket),
          { ...action.payload, quantity: 1 },
        ];
      }
      console.log(state.basket);
    },

    increaseBasket: (state, action) => {
      let findIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      state.basket = current(state.basket).map((item, index) =>
        index === findIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    },

    decreaseBasket: (state, action) => {
      let findIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      state.basket = current(state.basket).map((item, index) =>
        index === findIndex ? { ...item, quantity: item.quantity - 1 } : item
      );
    },

    deleteBasket: (state, action) => {
      state.basket = state.basket.filter(
        (item) => item._id != action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (item) => item._id != action.payload._id
        );
      })
      .addCase(fetchDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addWishlist,
  deleteWishlist,
  addBasket,
  decreaseBasket,
  increaseBasket,
  deleteBasket,
} = userSlice.actions;

export default userSlice.reducer;
