import { createSlice } from "@reduxjs/toolkit";

const users =
  localStorage.getItem("users") !== null ? JSON.parse(localStorage.getItem("users")) : [];
const initialState = { value: users };

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newUser = action.payload;
      state.value.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
    removeUSer: (state, action) => {
      const userId = action.payload;
      state.value = state.value.filter((user) => user.uid !== userId.uid);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
  },
});

export const { setUser, removeUSer } = usersSlice.actions;
export default usersSlice.reducer;
