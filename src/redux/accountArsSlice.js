import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  currency: "ARS",
  balance: 0,
  cbu: "",
  transactionLimit: 0,
};

// reducer: differentes acciones que se pueden modificar en el estado
export const accountArsSlice = createSlice({
    name: "accountARS",
    initialState,
    reducers: {
        addAccountArs: (state, action) => {
            const { id, balance, cbu, transactionLimit} = action.payload;
            state.id = id;
            state.balance = balance;
            state.cbu = cbu;
            state.transactionLimit = transactionLimit;
        },
        changeBalanceArs: (state, action) => {
            state.balance = action.payload;
        }
    },
});

export const { addAccountArs, changeBalanceArs } = accountArsSlice.actions;

export default accountArsSlice.reducer;
