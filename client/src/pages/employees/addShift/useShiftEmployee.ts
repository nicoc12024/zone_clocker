import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { makeRequest } from "../../../axios";
import { fetchShifts } from "../../../slices/shift/shiftSlice";
import { format } from "date-fns";
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { toggleModalOutOfZone } from "../../../slices/shift/shiftSlice";

export const useShiftEmployee = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentUser } = useAuth();

  const [activeShiftForModal, setActiveShiftForModal] = useState<number | null>(null);
  // New state for tracking active shift for check-out modal
  const [activeShiftForCheckOutModal, setActiveShiftForCheckOutModal] = useState<
    number | null
  >(null);

  // Function to open check-out modal for a specific shift
  const openCheckOutModalForShift = (id_shift: number) => {
    setActiveShiftForCheckOutModal(id_shift);
    setActiveShiftForModal(null);
  };

  // Function to close check-out modal
  const closeCheckOutModalForShift = () => {
    setActiveShiftForCheckOutModal(null);
  };

  // Function to open modal for a specific shift
  const openModalForShift = (id_shift: number) => {
    setActiveShiftForModal(id_shift);
    setActiveShiftForCheckOutModal(null);
  };

  // Function to close any open modal
  const closeModalForShift = () => {
    setActiveShiftForModal(null);
  };

  // Function to get current time in "HH:mm:ss" format
  const getCurrentTimeFormatted = () => {
    const currentTime = new Date();
    return format(currentTime, "HH:mm:ss");
  };

  // Function to get current date in "yyyy-MM-dd" format
  const gerCurrentDateFormatted = () => {
    const currentDate = new Date();
    return format(currentDate, "yyyy-MM-dd");
  };

  // Function to calculate the distance between two points
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Haversine formula
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  const handleCheckIn = async (
    id_shift: number,
    check_in: string,
    check_in_date: string
  ) => {
    try {
      // If no zone data is available, proceed with check-in without location validation
      if (currentUser?.id_zone === null) {
        await makeRequest.put(`/shift/update-shift/${id_shift}`, {
          check_in,
          check_in_date,
          check_out: null,
        });
        dispatch(fetchShifts());
        return;
      }

      const res = await makeRequest.get(`zone/get-zone/${currentUser?.id_zone}`);
      const zone = res.data;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Check if the user is within the zone
          const distance = calculateDistance(
            latitude,
            longitude,
            zone.latitude,
            zone.longitude
          );
          if (distance <= zone.radius) {
            // User is within the zone, proceed with check in
            await makeRequest.put(`/shift/update-shift/${id_shift}`, {
              check_in,
              check_in_date,
              check_out: null,
            });
            dispatch(fetchShifts());
          } else {
            dispatch(toggleModalOutOfZone());
          }
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckOut = async (
    id_shift: number,
    check_out: string,
    check_out_date: string
  ) => {
    try {
      // If no zone data is available, proceed with check-in without location validation
      if (currentUser?.id_zone === null) {
        await makeRequest.put(`/shift/update-shift/${id_shift}`, {
          check_out_date,
          check_out,
        });
        dispatch(fetchShifts());
        return;
      }
      const res = await makeRequest.get(`zone/get-zone/${currentUser?.id_zone}`);
      const zone = res.data;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Check if the user is within the zone
          const distance = calculateDistance(
            latitude,
            longitude,
            zone.latitude,
            zone.longitude
          );
          if (distance <= zone.radius) {
            // User is within the zone, proceed with check out
            await makeRequest.put(`/shift/update-shift/${id_shift}`, {
              check_out_date,
              check_out,
            });
            dispatch(fetchShifts());
          } else {
            dispatch(toggleModalOutOfZone());
          }
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetCheckOut = async (
    id_shift: number,
    check_out_date: string,
    check_out: string,
    check_in: string
  ) => {
    try {
      await makeRequest.put(`/shift/update-shift/${id_shift}`, {
        check_out,
        check_out_date,
        check_in,
      });
      dispatch(fetchShifts());
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetCheckInCheckOut = async (
    id_shift: number,
    check_in: null,
    check_out: null
  ) => {
    try {
      await makeRequest.put(`/shift/update-shift/${id_shift}`, {
        check_in,
        check_out,
      });
      dispatch(fetchShifts());
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleCheckIn,
    handleCheckOut,
    getCurrentTimeFormatted,
    handleResetCheckOut,
    handleResetCheckInCheckOut,
    gerCurrentDateFormatted,
    openModalForShift,
    closeModalForShift,
    activeShiftForModal,
    openCheckOutModalForShift,
    closeCheckOutModalForShift,
    activeShiftForCheckOutModal,
  };
};
