import { useState } from "react";
import MainTitleAndButtonAction from "../../../sharedComponents/MainTitleAndButtonAction";
import Form from "./Form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ModalAddNewZone from "../addNewZone/ModalAddNewZone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEmployee() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const formInputs = useSelector((state: RootState) => state.employee);

  const { isVisible } = useSelector((state: RootState) => state.modal);

  const handleMenuClick = (dropdownOpen: boolean) => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };

  return (
    <div className="my-2 sm:mx-0 mx-auto p-4 bg-white min-w-[20px] max-w-[700px]">
      <div className="sm:mb-4 mb-4 flex sm:flex-row flex-col items-center gap-2">
        <MainTitleAndButtonAction
          title={formInputs.id_employee ? "Edit employee" : "Add employee"}
        />
      </div>
      <hr className="h-px mb-4 bg-gray-200 border-0" />
      <Form handleMenuClick={handleMenuClick} dropdownOpen={dropdownOpen} />
      {isVisible && <ModalAddNewZone />}
      <ToastContainer />
    </div>
  );
}
