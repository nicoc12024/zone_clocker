import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setFormInputs } from "../../../slices/employees/employeeSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { toggleModal } from "../../../slices/zones/modalSlice";
import { toast } from "react-toastify";
import { makeRequest } from "../../../axios";
import { fetchEmployees } from "../../../slices/employees/employeeSlice";

export const useEmployee = () => {
  const dispatch: AppDispatch = useDispatch();

  const [nameError, setNameError] = useState<string | null>(null);
  const [idNumberError, setIdNumberError] = useState<string | null>(null);
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(null);

  const employeeNotification = (message: string) => {
    toast(message);
  };

  const formInputs = useSelector((state: RootState) => state.employee);
  const { zoneList } = useSelector((state: RootState) => state.zones);

  // Validation function
  const validateNameLength = (name: string) => {
    if (name.length > 26) {
      return "Error: Name too long";
    }
    return null;
  };

  const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
    const newName = (e.target as HTMLInputElement).value;

    const error = validateNameLength(newName);

    setNameError(error);

    dispatch(
      setFormInputs({
        ...formInputs,
        name: newName,
      })
    );
  };

  const handleIdNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newIdNumber = e.target.value;

    if (newIdNumber.length > 20) {
      setIdNumberError("Error: ID number too long");
      return;
    } else {
      setIdNumberError(null);
    }

    dispatch(
      setFormInputs({
        ...formInputs,
        id_number: newIdNumber.trim(),
      })
    );
  };

  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMobile_Number = e.target.value;

    if (newMobile_Number.length > 20) {
      setMobileNumberError("Error: Mobile number too long");
      return;
    } else {
      setMobileNumberError(null);
    }

    dispatch(
      setFormInputs({
        ...formInputs,
        mobile_number: newMobile_Number,
      })
    );
  };

  const handleZoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPlaceOfWork = e.target.value;
    let id_zone: number | null;

    if (selectedPlaceOfWork !== "AddNewZone" && selectedPlaceOfWork !== "None") {
      const selectedZone = zoneList.find((zone) => zone.name === selectedPlaceOfWork);
      if (selectedZone) {
        id_zone = selectedZone.id_zone;
      }
      dispatch(
        setFormInputs({
          ...formInputs,
          id_zone: id_zone!,
          zone: selectedPlaceOfWork,
        })
      );
    } else if (selectedPlaceOfWork === "AddNewZone") {
      dispatch(toggleModal());
    } else {
      dispatch(
        setFormInputs({
          ...formInputs,
          id_zone: null,
          zone: "Not assigned",
        })
      );
    }
  };

  const handleDeleteEmployee = async (id_employee: number | null) => {
    await makeRequest.delete(`/employee/delete-employee/${id_employee}`);
    employeeNotification("Employee deleted successfully");
    dispatch(fetchEmployees());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      name,
      id_number,
      is_active,
      birthday,
      mobile_number,
      email,
      zone,
      id_employee,
      id_zone,
    } = formInputs;

    let modify_birthday;
    let modify_email;

    if (birthday === "") {
      modify_birthday = null;
    } else {
      modify_birthday = birthday;
    }

    if (email === "") {
      modify_email = null;
    } else {
      modify_email = email;
    }

    //Update / Add employee
    if (id_employee) {
      // Update employee when zone is null and when zone is not null
      if (id_zone === null) {
        await makeRequest.put(`/employee/update-employee/${id_employee}`, {
          name,
          id_number,
          is_active,
          birthday: modify_birthday,
          mobile_number,
          email: modify_email,
          zone,
          id_zone: null,
        });
        employeeNotification("Employee updated successfully");
      } else {
        await makeRequest.put(`/employee/update-employee/${id_employee}`, {
          name,
          id_number,
          is_active,
          birthday: modify_birthday,
          mobile_number,
          email: modify_email,
          zone,
          id_zone,
        });
        employeeNotification("Employee updated successfully");
      }
    } else {
      await makeRequest.post("/employee/add-employee", {
        name,
        id_number,
        is_active,
        birthday: modify_birthday,
        mobile_number,
        email: modify_email,
        zone,
        id_zone,
      });
      employeeNotification("Employee added successfully");
    }

    dispatch(resetState());
  };

  return {
    handleSubmit,
    nameError,
    mobileNumberError,
    idNumberError,
    handleIdNumberChange,
    handleNameChange,
    handleZoneChange,
    handleMobileNumberChange,
    handleDeleteEmployee,
  };
};
