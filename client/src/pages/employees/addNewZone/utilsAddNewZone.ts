import { makeRequest } from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { resetIdZoneToDelete, toggleModal } from "../../../slices/zones/modalSlice";
import {
  setSelectedCoordinates,
  setFormInputs,
  resetState,
  fetchZones,
} from "../../../slices/zones/zonesSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { fetchEmployees } from "../../../slices/employees/employeeSlice";

const isValidNewZone = (
  name: string | undefined,
  latitude: number | null | undefined,
  longitude: number | null | undefined
): boolean => {
  if (!name) {
    console.log("Name is required.");

    return false;
  }

  if (name.length > 25) {
    console.log("Name must be a maximum of 25 characters.");
    console.log("Name length: ", name.length);

    return false;
  }

  if (!latitude || !longitude) {
    console.log("Selected coordinates are required.");

    return false;
  }

  return true;
};

export const useAddZone = () => {
  const notify = () => {
    toast("Deleted Successfully!");
  };

  const notify2 = () => {
    toast("Updated Successfully!");
  };
  const dispatch: AppDispatch = useDispatch();

  const { selectedCoordinates, name, radius, id_zone } = useSelector(
    (state: RootState) => state.zones
  );

  const [nameError, setNameError] = useState<string | null>(null);

  const updateZone = async () => {
    if (!isValidNewZone(name, selectedCoordinates?.lat, selectedCoordinates?.lng))
      throw new Error("Invalid data provided for adding zone.");

    await makeRequest.put("/zone/update-zone", {
      name,
      radius,
      latitude: selectedCoordinates?.lat,
      longitude: selectedCoordinates?.lng,
      id_zone,
    });
    dispatch(toggleModal());
    notify2();
  };

  const createNewZone = async () => {
    if (!isValidNewZone(name, selectedCoordinates?.lat, selectedCoordinates?.lng))
      throw new Error("Invalid data provided for adding zone.");

    await makeRequest.post("/zone/add-zone", {
      name,
      latitude: selectedCoordinates?.lat,
      longitude: selectedCoordinates?.lng,
      radius: radius,
    });
    dispatch(toggleModal());
  };

  const onSubmitZoneModal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id_zone) {
        await updateZone();
      } else {
        await createNewZone();
      }

      dispatch(fetchZones());

      // Reset form values
      dispatch(setSelectedCoordinates(null));
      dispatch(resetState());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteZone = async (id_zone: number) => {
    try {
      // Delete zone from database
      await makeRequest.delete(`/zone/delete-zone/${id_zone}`);
      // Update all employee that had the deleted zone to ""
      await makeRequest.put("/employee/update-zone", {
        id_zone,
      });

      // Rest the id_zone to delete
      dispatch(resetIdZoneToDelete());
      // Fetch all employees again
      dispatch(fetchEmployees());
      // Fetch all zones again
      dispatch(fetchZones());
      // Notification for successful deletion of the zone
      notify();
    } catch (error) {
      console.error("Error deleting the zone:", error);
    }
  };

  const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
    const newName = (e.target as HTMLInputElement).value;

    if (newName.length > 24) {
      setNameError("You have reached max characters: 25");
    } else if (newName.length < 24) {
      setNameError(null);
    }

    dispatch(setFormInputs({ name: newName, radius, id_zone }));
  };

  const handleRadiusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRadius = parseInt((e.target as HTMLSelectElement).value);
    dispatch(setFormInputs({ name, radius: newRadius, id_zone }));
  };

  return {
    onSubmitZoneModal,
    handleRadiusChange,
    handleNameChange,
    nameError,
    deleteZone,
  };
};
