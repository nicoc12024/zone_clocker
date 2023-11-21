import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { toast } from "react-toastify";
import { makeRequest } from "../../../axios";
import {
  toggleModal,
  resetStateShift,
  fetchShifts,
} from "../../../slices/shift/shiftSlice";

export const useShift = () => {
  const dispatch: AppDispatch = useDispatch();

  const shiftNotification = (message: string) => {
    toast(message);
  };

  const shift = useSelector((state: RootState) => state.shift);

  const handleDeleteShift = async (id_shift: number) => {
    await makeRequest.delete(`/shift/delete-shift/${id_shift}`);
    shiftNotification("Shift deleted successfully");
    dispatch(resetStateShift());
    dispatch(fetchShifts());
  };

  const handleEditSubmit = async () => {
    const { start_time, end_time, id_employee, id_shift } = shift;

    // Add employee shift
    await makeRequest.put(`/shift/update-shift/${id_shift}`, {
      start_time,
      end_time,
      id_employee,
    });

    shiftNotification("Shift updated successfully");
    dispatch(toggleModal());
    dispatch(resetStateShift());
    dispatch(fetchShifts());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { start_time, end_time, date, id_employee, id_zone } = shift;

    // Add employee shift
    await makeRequest.post("/shift/add-shift", {
      start_time,
      end_time,
      date,
      id_employee,
      id_zone,
    });

    shiftNotification("Shift added successfully");
    dispatch(toggleModal());
    dispatch(resetStateShift());
    dispatch(fetchShifts());
  };

  return {
    handleSubmit,
    handleEditSubmit,
    handleDeleteShift,
  };
};
