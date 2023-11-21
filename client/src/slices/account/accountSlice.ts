import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeRequest } from "../../axios";

interface Account {
  name: string;
  email: string;
  password: string;
  id_admin?: number;
  id_company?: number;
}

interface AccountState {
  accountList: Account[];
  name: string;
  email: string;
  password: string;
  isVisibleCreateAccount: boolean;
  isVisibleEditAccount: boolean;
  id_admin?: number;
  id_company?: number;
}

const initialState: AccountState = {
  accountList: [],
  name: "",
  email: "",
  password: "",
  id_admin: 0,
  id_company: 0,
  isVisibleCreateAccount: false,
  isVisibleEditAccount: false,
};

export const fetchAccounts = createAsyncThunk("addEmployee/fetchAccounts", async () => {
  const response = await makeRequest.get("/account/get-accounts");

  return response.data;
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isVisibleCreateAccount = !state.isVisibleCreateAccount;
    },
    toggleEditModal: (state) => {
      state.isVisibleEditAccount = !state.isVisibleEditAccount;
    },
    setFormInputs: (state, action: PayloadAction<Account>) => {
      state.name = action.payload.name ?? state.name;
      state.email = action.payload.email ?? state.email;
      state.password = action.payload.password ?? state.password;
      state.id_admin = action.payload.id_admin ?? state.id_admin;
      state.id_company = action.payload.id_company ?? state.id_company;
    },
    setAccountList: (state, action: PayloadAction<Account[]>) => {
      state.accountList = action.payload;
    },
    resetState: (state) => {
      state.name = initialState.name;
      state.email = initialState.email;
      state.password = initialState.password;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAccounts.fulfilled,
      (state, action: PayloadAction<Account[]>) => {
        state.accountList = action.payload;
      }
    );
  },
});

export const { setFormInputs, resetState, setAccountList, toggleModal, toggleEditModal } =
  accountSlice.actions;
export default accountSlice.reducer;
