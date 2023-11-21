import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../../axios";
import { format } from "date-fns";

interface Shift {
  id_shift?: number | null;
  id_zone?: number | null;
  date?: string;
  start_time: string;
  end_time: string;
  id_employee: number;
  employee_name?: string;
  check_in?: string;
  check_out?: string;
  check_in_date?: string;
  check_out_date?: string;
}

interface ShiftState {
  shiftList?: Shift[];
  isVisible?: boolean;
  isVisibleDelete?: boolean;
  id_shiftToDelete?: number | null;
  id_shift?: number | null;
  date?: string;
  id_zone?: number | null;
  start_time: string;
  end_time: string;
  id_employee: number;
  employee_name?: string;
  isPaginationModalVisible?: boolean;
  isOutOfZone?: boolean;
  check_in?: string | null;
  check_out?: string | null;
  check_in_date?: string | null;
  check_out_date?: string | null;
}

const initialState: ShiftState = {
  shiftList: [],
  isVisible: false,
  isVisibleDelete: false,
  id_shiftToDelete: null,
  id_shift: null,
  start_time: "",
  end_time: "",
  date: "",
  id_employee: 0,
  id_zone: null,
  employee_name: "",
  isPaginationModalVisible: false,
  isOutOfZone: false,
  check_in: null,
  check_out: null,
  check_in_date: null,
  check_out_date: null,
};

export const fetchShifts = createAsyncThunk("shift/fetchShifts", async () => {
  const response = await makeRequest.get("/shift/get-shifts");
  return response.data;
});

const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isVisible = !state.isVisible;
    },
    toggleModalOutOfZone: (state) => {
      state.isOutOfZone = !state.isOutOfZone;
    },
    toggleModalDelete: (state, action) => {
      state.isVisibleDelete = !state.isVisibleDelete;
      state.id_shiftToDelete = action.payload;
    },
    toggleModalPagination: (state) => {
      state.isPaginationModalVisible = !state.isPaginationModalVisible;
    },
    setShiftList: (state, action: PayloadAction<Shift[]>) => {
      state.shiftList = action.payload;
    },
    setShift: (state, action: PayloadAction<Partial<Shift>>) => {
      state.id_shift = action.payload.id_shift ?? state.id_shift;
      state.start_time = action.payload.start_time ?? state.start_time;
      state.end_time = action.payload.end_time ?? state.end_time;
      state.date = action.payload.date ?? state.date;
      state.id_employee = action.payload.id_employee ?? state.id_employee;
      state.id_zone = action.payload.id_zone ?? state.id_zone;
      state.employee_name = action.payload.employee_name ?? state.employee_name;
      state.check_in = action.payload.check_in ?? state.check_in;
      state.check_out = action.payload.check_out ?? state.check_out;
      state.check_in_date = action.payload.check_in_date ?? state.check_in_date;
      state.check_out_date = action.payload.check_out_date ?? state.check_out_date;
    },
    resetStateShift: (state) => {
      state.id_shift = initialState.id_shift;
      state.start_time = initialState.start_time;
      state.end_time = initialState.end_time;
      state.date = initialState.date;
      state.id_employee = initialState.id_employee;
      state.id_zone = initialState.id_zone;
      state.employee_name = initialState.employee_name;
      state.check_in = initialState.check_in;
      state.check_out = initialState.check_out;
      state.check_in_date = initialState.check_in_date;
      state.check_out_date = initialState.check_out_date;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShifts.fulfilled, (state, action) => {
      state.shiftList = action.payload.map((shift: Shift) => ({
        ...shift,
        date: shift.date ? format(new Date(shift.date), "yyyy-MM-dd") : null,
        // format the time to HH:MM using the substring method since the time we set it to "string"
        start_time: shift.start_time ? shift.start_time.substring(0, 5) : null,
        end_time: shift.end_time ? shift.end_time.substring(0, 5) : null,
        check_in: shift.check_in ? shift.check_in.substring(0, 5) : null,
        check_out: shift.check_out ? shift.check_out.substring(0, 5) : null,
        check_in_date: shift.check_in_date
          ? format(new Date(shift.check_in_date), "yyyy-MM-dd")
          : null,
        check_out_date: shift.check_out_date
          ? format(new Date(shift.check_out_date), "yyyy-MM-dd")
          : null,
      }));
    });
  },
});

export const {
  resetStateShift,
  toggleModal,
  setShiftList,
  setShift,
  toggleModalDelete,
  toggleModalPagination,
  toggleModalOutOfZone,
} = shiftSlice.actions;
export default shiftSlice.reducer;
