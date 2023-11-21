import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Switch } from "@headlessui/react";
import { useEmployee } from "../useAddEmployee/useAddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect } from "react";
import { fetchZones } from "../../../slices/zones/zonesSlice";
import { resetState, setFormInputs } from "../../../slices/employees/employeeSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface FormProps {
  handleMenuClick: (dropdownOpen: boolean) => void;
  dropdownOpen: boolean;
}

export default function Form({ dropdownOpen, handleMenuClick }: FormProps) {
  const dispatch: AppDispatch = useDispatch();
  const { zoneList } = useSelector((state: RootState) => state.zones);
  const formInputs = useSelector((state: RootState) => state.employee);

  const {
    nameError,
    mobileNumberError,
    idNumberError,
    handleNameChange,
    handleIdNumberChange,
    handleMobileNumberChange,
    handleZoneChange,
    handleSubmit,
  } = useEmployee();

  useEffect(() => {
    dispatch(fetchZones());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="mb-2 flex sm:flex-row flex-col items-start">
        <label
          htmlFor="name"
          className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={formInputs.name}
          onChange={handleNameChange}
          className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
          required
          maxLength={27}
        />
      </div>
      {nameError && <p className="text-xs text-right text-red-500 my-1">{nameError}</p>}
      <div className="mb-2 flex sm:flex-row flex-col items-start">
        <label
          htmlFor="idNumber"
          className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
        >
          ID number *
        </label>
        <input
          type="text"
          id="idNumber"
          value={formInputs.id_number ?? ""}
          onChange={handleIdNumberChange}
          className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
          required
        />
      </div>
      {idNumberError && (
        <p className="text-xs text-right text-red-500 my-1">{idNumberError}</p>
      )}
      {/* Toggle button */}
      <div className="flex items-center justify-between mb-4 ">
        <span className="text-gray-600 font-medium sm:text-sm text-xs w-[40%] text-right">
          Active/Inactive
        </span>
        <div className="w-[100%] text-right">
          <Switch
            checked={formInputs.is_active}
            onChange={(newIsActive) => {
              dispatch(setFormInputs({ ...formInputs, is_active: newIsActive }));
            }}
            className={classNames(
              formInputs.is_active ? "bg-orange-600" : "bg-gray-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                formInputs.is_active ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          onClick={() => handleMenuClick(dropdownOpen)}
          className="mb-4 py-[0.5rem] px-[1rem] text-xs rounded bg-gray-200 w-fit flex items-center flex-row gap-2 cursor-pointer"
        >
          {dropdownOpen ? (
            <>
              <AiFillCaretUp /> <button type="button">Show less</button>
            </>
          ) : (
            <>
              <AiFillCaretDown /> <button type="button">Show more</button>
            </>
          )}
        </div>
      </div>
      {dropdownOpen && (
        <>
          <div className="mb-2 flex sm:flex-row flex-col items-start">
            <label
              htmlFor="birthday"
              className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              value={formInputs.birthday ?? ""}
              onChange={(e) =>
                dispatch(setFormInputs({ ...formInputs, birthday: e.target.value }))
              }
              className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-2 flex sm:flex-row flex-col items-start">
            <label
              htmlFor="mobileNumber"
              className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              value={formInputs.mobile_number ?? ""}
              onChange={handleMobileNumberChange}
              className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          {mobileNumberError && (
            <p className="text-xs text-right text-red-500 my-1">{mobileNumberError}</p>
          )}
          <div className="mb-2 flex sm:flex-row flex-col items-start">
            <label
              htmlFor="email"
              className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formInputs.email ?? ""}
              onChange={(e) =>
                dispatch(setFormInputs({ ...formInputs, email: e.target.value }))
              }
              className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-2 flex sm:flex-row flex-col items-start">
            <label
              htmlFor="zone"
              className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Zone
            </label>
            <select
              id="zone"
              value={formInputs.zone ?? ""}
              onChange={handleZoneChange}
              className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
            >
              <option value="None">None</option>
              {zoneList.map((r: { id_zone: number; name: string }) => (
                <option key={r.id_zone} value={r.name}>
                  {r.name}
                </option>
              ))}
              <option value="AddNewZone">+ Add new zone</option>
            </select>
          </div>
        </>
      )}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => dispatch(resetState())}
          type="button"
          className="text-center sm:py-[0.5rem] sm:px-[1rem] py-[0.2rem] px-[0.5rem] bg-gray-500 text-white text-sm font-normal rounded"
        >
          Cancel
        </button>
        {formInputs.id_employee ? (
          <button
            type="submit"
            // if any of the errors exist, will return true, and the button will be disabled
            disabled={!!nameError || !!idNumberError || !!mobileNumberError}
            className={`text-center sm:py-[0.5rem] sm:px-[1rem] py-[0.2rem] px-[0.5rem] text-white text-sm font-normal rounded ${
              !!nameError || !!idNumberError || !!mobileNumberError
                ? "bg-gray-200"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            // if any of the errors exist, will return true, and the button will be disabled
            disabled={!!nameError || !!idNumberError || !!mobileNumberError}
            className={`text-center sm:py-[0.5rem] sm:px-[1rem] py-[0.2rem] px-[0.5rem] text-white text-sm font-normal rounded ${
              !!nameError || !!idNumberError || !!mobileNumberError
                ? "bg-gray-200"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}
