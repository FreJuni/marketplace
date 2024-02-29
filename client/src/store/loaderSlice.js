import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const loaderAction = loaderSlice.actions;
export default loaderSlice.reducer;
