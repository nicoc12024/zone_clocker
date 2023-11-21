import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleModalDelete } from "../../../slices/zones/modalSlice";
import { useClickOutside } from "../../../sharedCustomHooks/useClickOutside";
import { useAddZone } from "./utilsAddNewZone";
import { AppDispatch, RootState } from "../../../store/store";
import { resetState } from "../../../slices/zones/zonesSlice";

const ModalDeleteZone: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { id_zoneToDelete } = useSelector((state: RootState) => state.modal);

  const { deleteZone } = useAddZone();

  // Close modal when clicking outside of it
  useClickOutside(modalRef, () => {
    dispatch(toggleModal());
  });

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
      <div ref={modalRef} className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Zone
            </h3>
            <button
              onClick={() => dispatch(toggleModal())}
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
            <p>Are you sure you want to delete?</p>
            <div className="flex items-center justify-end pt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => dispatch(toggleModalDelete(null))}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Close modal, null because id_zoneToDelete was stored in redux before this modal shows
                  // so we can use it here in the 2nd fn to delete the zone from database
                  dispatch(toggleModalDelete(null));
                  deleteZone(id_zoneToDelete);
                  dispatch(resetState());
                }}
                className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteZone;
