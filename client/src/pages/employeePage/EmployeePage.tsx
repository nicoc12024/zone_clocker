import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PaginationModal } from "../employees/addShift/PaginationModal";
import { AuthContext } from "../../context/AuthContext";
import MainTitleAndButtonAction from "../../sharedComponents/MainTitleAndButtonAction";
import Pagination from "../../sharedComponents/Pagination";
import { usePagination } from "../employees/addShift/usePagination";
import Table from "../employees/addShift/Table";
import { ModalOutOfZone } from "../employees/addShift/ModalOutOfZone";

const EmployeePage: React.FC = () => {
  const { isPaginationModalVisible } = useSelector((state: RootState) => state.shift);

  const { employeeList } = useSelector((state: RootState) => state.employee);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { currentUser } = authContext;

  const filteredEmployeeList = employeeList?.filter(
    (employee) => employee.id_employee === currentUser?.id
  );

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

  const { isOutOfZone } = useSelector((state: RootState) => state.shift);

  return (
    <div>
      {isPaginationModalVisible && <PaginationModal />}
      {isOutOfZone && <ModalOutOfZone />}

      {/* Table Employee Schedule */}
      <div className="relative mt-2 sm:mx-0 mx-auto pt-4 pr-4 pl-4 bg-white w-full">
        <div className="mb-4 flex sm:flex-row flex-col items-center gap-2">
          <MainTitleAndButtonAction title="Your Schedule" />
        </div>
        <hr className="h-px mb-4 bg-gray-200 border-0" />
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pt-2 align-middle">
            <Table
              endDate={endDate}
              startDate={startDate}
              filteredEmployeeList={filteredEmployeeList}
            />
          </div>
        </div>
      </div>
      {/* Pagination */}
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

export default EmployeePage;
