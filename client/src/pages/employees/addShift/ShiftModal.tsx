import React, { useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { resetStateShift, setShift, toggleModal } from "../../../slices/shift/shiftSlice";
import { useShift } from "./useShift";

export const ShiftModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { handleSubmit, handleEditSubmit } = useShift();

  const shift = useSelector((state: RootState) => state.shift);

  const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setShift({ start_time: event.target.value }));
  };

  const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setShift({ end_time: event.target.value }));
  };

  // For click outside modal and close it
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(toggleModal());
        dispatch(resetStateShift());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, dispatch]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-ful">
      <div ref={modalRef} className="relative max-w-[340px]">
        {/* Modal content */}
        <div className="relative bg-white  rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3>
              Shift for {shift.employee_name} on {shift.date}
            </h3>
            <button
              onClick={() => {
                dispatch(resetStateShift());
                dispatch(toggleModal());
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-2 flex sm:flex-row flex-col items-start">
                <label
                  htmlFor="startTime"
                  className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
                >
                  Start Time:
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={shift.start_time}
                  onChange={handleStartTimeChange}
                  className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
                  required
                />
              </div>
              <div className="mb-6 flex sm:flex-row flex-col items-start">
                <label
                  htmlFor="endTime"
                  className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
                >
                  End Time:
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={shift.end_time}
                  onChange={handleEndTimeChange}
                  className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
                  required
                />
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end pt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    dispatch(resetStateShift());
                    dispatch(toggleModal());
                  }}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                >
                  Cancel
                </button>
                {shift.id_shift ? (
                  <button
                    onClick={handleEditSubmit}
                    type="button"
                    className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
