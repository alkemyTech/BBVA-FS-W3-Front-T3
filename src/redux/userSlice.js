import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
};

// reducer: differentes acciones que se pueden modificar en el estado
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { firstName, lastName, email, token } = action.payload;
      state.name = firstName + " " + lastName;
      state.email = email;
      state.token = token;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { addUser, changeEmail, logoutUser } = userSlice.actions;
export default userSlice.reducer;
