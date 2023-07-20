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
      const { fistName, lastName, email, token } = action.payload;
      state.name = fistName + " " + lastName;
      state.email = email;
      state.token = token;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { addUser, changeEmail } = userSlice.actions;
export default userSlice.reducer;
