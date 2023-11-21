import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isVisible: boolean;
  isVisibleDelete: boolean;
  id_zoneToDelete: number;
}

const initialState: ModalState = {
  isVisible: false,
  isVisibleDelete: false,
  id_zoneToDelete: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isVisible = !state.isVisible;
    },
    toggleModalDelete: (state, action) => {
      state.isVisibleDelete = !state.isVisibleDelete;
      state.id_zoneToDelete = action.payload;
    },
    resetIdZoneToDelete: (state) => {
      state.id_zoneToDelete = 0;
    },
  },
});

export const { toggleModal, toggleModalDelete, resetIdZoneToDelete } = modalSlice.actions;
export default modalSlice.reducer;
