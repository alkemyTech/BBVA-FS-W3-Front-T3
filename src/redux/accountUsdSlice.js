import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  currency: "USD",
  balance: 0,
  cbu: "",
  transactionLimit: 0,
};

// reducer: differentes acciones que se pueden modificar en el estado
export const accountUsdSlice = createSlice({
  name: "accountUsd",
  initialState,
  reducers: {
    addAccountUsd: (state, action) => {
      const { id, balance, cbu, transactionLimit } = action.payload;
      state.id = id;
      state.balance = balance;
      state.cbu = cbu;
      state.transactionLimit = transactionLimit;
    },
    changeBalanceUsd: (state, action) => {
      state.balance = action.payload;
    },
    logoutAccountUsd: (state) => {
      state.id = 0;
      state.balance = 0;
      state.cbu = "";
      state.transactionLimit = 0;
    },
  },
});

export const { addAccountUsd, changeBalanceUsd, logoutAccountUsd } =
  accountUsdSlice.actions;

export default accountUsdSlice.reducer;
