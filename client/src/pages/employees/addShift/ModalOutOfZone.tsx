import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { toggleModalOutOfZone } from "../../../slices/shift/shiftSlice";

export const ModalOutOfZone: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // For click outside modal and close it
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(toggleModalOutOfZone());
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
            <h3>Information</h3>
            <button
              onClick={() => {
                dispatch(toggleModalOutOfZone());
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
            <p>You are out of zone, you cannot perform any action.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
