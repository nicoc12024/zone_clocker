import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../../axios";

interface Zone {
  id_zone: number;
  name: string;
  id_company: number;
  latitude: number;
  longitude: number;
  radius: number;
}

interface ZoneState {
  // zoneList used to fetch all zones from DB
  zoneList: Zone[];
  // These are used to add a new zone or edit an existing one
  selectedCoordinates: { lat: number; lng: number } | null;
  name: string;
  radius: number;
  id_zone: number;
}

const initialState: ZoneState = {
  zoneList: [],
  selectedCoordinates: null,
  name: "",
  radius: 200,
  id_zone: 0,
};

export const fetchZones = createAsyncThunk("zones/fetchZones", async () => {
  const response = await makeRequest.get("/zone/get-zones");
  return response.data;
});

const zoneSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    setZones: (state, action: PayloadAction<Zone[]>) => {
      state.zoneList = action.payload;
    },
    setSelectedCoordinates: (
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>
    ) => {
      state.selectedCoordinates = action.payload;
    },
    setFormInputs: (
      state,
      action: PayloadAction<{
        name: string;
        radius: number;
        id_zone: number;
      }>
    ) => {
      state.name = action.payload.name;
      state.radius = action.payload.radius;
      state.id_zone = action.payload.id_zone;
    },
    resetState: (state) => {
      state.selectedCoordinates = null;
      state.name = "";
      state.radius = 200;
      state.id_zone = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchZones.fulfilled, (state, action) => {
      // Updated zoneList 
      state.zoneList = action.payload;
    });
  },
});

export const { setZones, setSelectedCoordinates, setFormInputs, resetState } =
  zoneSlice.actions;
export default zoneSlice.reducer;
