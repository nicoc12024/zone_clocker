import { configureStore } from "@reduxjs/toolkit";
import zoneReducer from "../slices/zones/zonesSlice";
import modalReducer from "../slices/zones/modalSlice";
import employeeReducer from "../slices/employees/employeeSlice";
import shiftReducer from "../slices/shift/shiftSlice";
import accountReducer from "../slices/account/accountSlice";

export const store = configureStore({
  reducer: {
    zones: zoneReducer,
    modal: modalReducer,
    employee: employeeReducer,
    shift: shiftReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
