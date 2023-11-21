import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeRequest } from "../../axios";

interface Employee {
  name: string;
  id_number: string | null;
  id_employee: number | null;
  birthday: string | null;
  email: string | null;
  id_zone: number | null;
  zone: string | null;
  is_active: boolean;
  mobile_number: string | null;
}

interface EmployeeState {
  employeeList: Employee[];
  name: string;
  id_number: string | null;
  id_employee: number | null;
  birthday: string | null;
  email: string | null;
  id_zone: number | null;
  zone: string | null;
  is_active: boolean;
  mobile_number: string | null;
  isVisible: boolean;
}

const initialState: EmployeeState = {
  employeeList: [],
  name: "",
  id_number: null,
  id_employee: null,
  birthday: null,
  email: "",
  id_zone: null,
  zone: "",
  is_active: true,
  mobile_number: null,
  isVisible: false,
};

export const fetchEmployees = createAsyncThunk("addEmployee/fetchEmployees", async () => {
  const response = await makeRequest.get("/employee/get-employees");
  return response.data;
});

// Define a utility function to format the birthday
const formatBirthday = (isoDateString?: string | null): string => {
  if (!isoDateString) return ""; // Return an empty string if the date is null or undefined
  const date = new Date(isoDateString);
  // Format the date to YYYY-MM-DD
  return date.toISOString().split("T")[0];
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isVisible = !state.isVisible;
    },
    setFormInputs: (state, action: PayloadAction<Partial<Employee>>) => {
      state.name = action.payload.name ?? state.name;
      state.birthday = formatBirthday(action.payload.birthday) ?? state.birthday;
      state.email = action.payload.email ?? state.email;
      state.id_number = action.payload.id_number ?? state.id_number;
      state.is_active = action.payload.is_active ?? state.is_active;
      state.mobile_number = action.payload.mobile_number ?? state.mobile_number;
      state.zone = action.payload.zone ?? state.zone;
      state.id_employee = action.payload.id_employee ?? state.id_employee;
      state.id_zone = action.payload.id_zone ?? state.id_zone;
    },
    setEmployeeList: (state, action: PayloadAction<Employee[]>) => {
      state.employeeList = action.payload;
    },
    resetState: (state) => {
      state.name = initialState.name;
      state.birthday = initialState.birthday;
      state.email = initialState.email;
      state.id_number = initialState.id_number;
      state.is_active = initialState.is_active;
      state.mobile_number = initialState.mobile_number;
      state.zone = initialState.zone;
      state.id_employee = initialState.id_employee;
      state.id_zone = initialState.id_zone;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmployees.fulfilled,
      (state, action: PayloadAction<Employee[]>) => {
        // Iterate over each employee and format their birthday
        state.employeeList = action.payload.map((employee: Employee) => ({
          ...employee,
          birthday: employee.birthday
            ? formatBirthday(employee.birthday)
            : employee.birthday,
        }));
      }
    );
  },
});

export const { setFormInputs, resetState, setEmployeeList, toggleModal } =
  employeeSlice.actions;
export default employeeSlice.reducer;
