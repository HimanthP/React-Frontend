import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  sortBy: "newest" | "oldest";
}

const initialState: FiltersState = {
  sortBy: "newest",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<"newest" | "oldest">) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = filtersSlice.actions;
export default filtersSlice.reducer;