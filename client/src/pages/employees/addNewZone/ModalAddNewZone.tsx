import React, { useRef } from "react";
import ModalForm from "./ModalForm";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../slices/zones/modalSlice";
import { useClickOutside } from "../../../sharedCustomHooks/useClickOutside";
import { resetState } from "../../../slices/zones/zonesSlice";

const ModalAddNewZone: React.FC = () => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal when clicking outside of it
  useClickOutside(modalRef, () => {
    dispatch(toggleModal());
    dispatch(resetState());
  });

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
      <div ref={modalRef} className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add new zone
            </h3>
            <button
              onClick={() => {
                dispatch(resetState());
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
            <ModalForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddNewZone;
