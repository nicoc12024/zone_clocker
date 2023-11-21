import React from "react";
import { useSelector } from "react-redux";
import MainTitleAndButtonAction from "../../../sharedComponents/MainTitleAndButtonAction";
import { RootState } from "../../../store/store";
import { ToastContainer } from "react-toastify";
import ModalDeleteShift from "./ModalDeleteShift";
import { PaginationModal } from "./PaginationModal";
import { ShiftModal } from "./ShiftModal";
import { usePagination } from "./usePagination";
import Pagination from "../../../sharedComponents/Pagination";
import Table from "./Table";
import { ModalOutOfZone } from "./ModalOutOfZone";

const AddShift: React.FC = () => {
  const {
    getWeekNumber,
    nextWeekDate,
    previousWeekDate,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
    realCurrentDate,
    startDate,
    endDate,
  } = usePagination();

  const { isVisible, isVisibleDelete, isPaginationModalVisible, isOutOfZone } =
    useSelector((state: RootState) => state.shift);

  return (
    <div>
      {/* Modals & Notification */}
      {isPaginationModalVisible && <PaginationModal />}
      {isVisible && <ShiftModal />}
      {isVisibleDelete && <ModalDeleteShift />}
      {isOutOfZone && <ModalOutOfZone />}
      <ToastContainer />

      {/*  Content */}
      <div className="relative mt-2 sm:mx-0 mx-auto pt-4 pr-4 pl-4 bg-white w-full">
        <div className="mb-4 flex sm:flex-row flex-col items-center gap-2">
          <MainTitleAndButtonAction title="Add Shift" />
        </div>
        <hr className="h-px mb-4 bg-gray-200 border-0" />
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pt-2 align-middle">
            <Table endDate={endDate} startDate={startDate} />
          </div>
        </div>
      </div>
      <Pagination
        goToPreviousWeek={goToPreviousWeek}
        goToCurrentWeek={goToCurrentWeek}
        goToNextWeek={goToNextWeek}
        getWeekNumber={getWeekNumber}
        realCurrentDate={realCurrentDate}
        nextWeekDate={nextWeekDate}
        previousWeekDate={previousWeekDate}
      />
    </div>
  );
};

export default AddShift;
