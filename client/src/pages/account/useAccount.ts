import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  resetState,
  toggleModal,
  toggleEditModal,
} from "../../slices/account/accountSlice";
import { AppDispatch, RootState } from "../../store/store";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";

interface localEditFormInputs {
  name: string;
  email: string;
  password: string;
  id_admin?: number;
  id_company?: number;
}

interface localFormInputs {
  name: string;
  email: string;
  password: string;
}

export const useAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const formInputs = useSelector((state: RootState) => state.account);

  // Local state for form inputs in Create new admin account
  const [localFormInputs, setLocalFormInputs] = useState<localFormInputs>({
    name: "",
    email: "",
    password: "",
  });

  // Local state for form inputs in Edit admin account
  const [localEditFormInputs, setLocalEditFormInputs] = useState<localEditFormInputs>({
    name: "",
    email: "",
    password: "",
    id_admin: 0,
    id_company: 0,
  });

  // Validation function
  const validateNameLength = (name: string) => {
    if (name.length > 26) {
      return "Error: Name too long";
    }
    return null;
  };

  // We set the localEditFormInputs when they click "edit" from tableBodyRow for local management
  // before send it to redux and api
  useEffect(() => {
    setLocalEditFormInputs(formInputs);
  }, [formInputs]);

  const notification = (message: string) => {
    toast(message);
  };

  /////// Handle everything for Create new admin account ///////
  // Handle local input name changes when Create new admin account
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    const error = validateNameLength(newName);

    setNameError(error);

    setLocalFormInputs((prevInputs) => ({
      ...prevInputs,
      name: newName,
    }));
  };

  // Handle local input changes when Create new admin account
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      handleNameChange(e);
    }

    setLocalFormInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle submit for Create new admin account
  const submitCreateAdmin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateNewAdminAccount();
  };

  // Handle the form state locally and dispatch to Redux
  const handleCreateNewAdminAccount = async () => {
    const { name, email, password } = localFormInputs;

    try {
      // Add new admin account
      await makeRequest.post("/account/add-account", {
        name,
        email,
        password,
      });
      dispatch(toggleModal());
      dispatch(fetchAccounts());
      dispatch(resetState());
      notification("Admin created successfully");
    } catch (error) {
      console.log(error);
      setEmailError("Error: Email already exists");
    }
  };

  /////// Handle everything for Edit  admin account ///////
  // We dispatch the account data  from TableBodyRow so we can show the inputs in ModalModifyAccount when we open it
  // and we do the local state management in useAccount then finally make the api call and
  // reset the state in redux

  // Handle local input  name changes when Editing admin account
  const handleNameChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const error = validateNameLength(newName);

    setNameError(error);

    setLocalEditFormInputs((prevInputs) => ({
      ...prevInputs,
      name: newName,
    }));
  };

  // Handle local input changes when Editing admin account
  const handleInputChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      handleNameChangeEdit(e);
    }

    setLocalEditFormInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle submit for Edit admin account
  const submitEditAdmin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditAdminAccount();
  };

  const handleEditAdminAccount = async () => {
    const { name, email, password, id_admin } = localEditFormInputs;
    // //Update admin account
    await makeRequest.put(`/account/update-admin/${id_admin}`, {
      name,
      email,
      password,
    });

    notification("Admin updated successfully");
    dispatch(fetchAccounts());
    dispatch(toggleEditModal());
    dispatch(resetState());
  };

  return {
    nameError,
    emailError,
    localFormInputs,
    localEditFormInputs,
    submitCreateAdmin,
    handleEditAdminAccount,
    handleNameChange,
    handleInputChange,
    setLocalEditFormInputs,
    submitEditAdmin,
    handleInputChangeEdit,
  };
};
