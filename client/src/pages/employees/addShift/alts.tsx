import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { TbReload } from "react-icons/tb";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import MainTitleAndButtonAction from "../../../sharedComponents/MainTitleAndButtonAction";
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchEmployees } from "../../../slices/employees/employeeSlice";
import { ToastContainer } from "react-toastify";
import ModalDeleteShift from "./ModalDeleteShift";
import { PaginationModal } from "./PaginationModal";
import { toggleModalPagination } from "../../../slices/shift/shiftSlice";
import { ShiftModal } from "./ShiftModal";
import { usePagination } from "./usePagination";

// const DAYS_IN_WEEK = 7;
// const WEEKS_IN_PERIOD = 12;

const AddShift: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

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

  // // Example: Fri Nov 17 2023 21:45:28 GMT+0100 (Central European Standard Time)
  // // this will increase or decrease by 7 days when we click on the next or previous week button
  // const [currentDate, setCurrentDate] = useState(new Date());

  // // Example: Fri Nov 17 2023 21:45:28 GMT+0100 (Central European Standard Time)
  // // this will always be the current date
  // const [realCurrentDate, setRealCurrentDate] = useState(new Date());

  const { isVisible, isVisibleDelete, isPaginationModalVisible } = useSelector(
    (state: RootState) => state.shift
  );

  const { employeeList } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // // eachDayOfInterval() returns an array of dates between the start and end dates
  // // startOfWeek() returns the first day of the week for the given date
  // // endOfWeek() returns the last day of the week for the given date
  // const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  // const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  // // used to update realCurrentDate at midnight if user doesn't refresh the page
  // useEffect(() => {
  //   const scheduleUpdate = () => {
  //     const now = new Date();
  //     // Create a new Date object representing the next midnight
  //     const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  //     // Calculate the time in milliseconds until midnight
  //     const timeToMidnight = midnight.getTime() - now.getTime();

  //     // Set a timeout to update the date at midnight
  //     setTimeout(() => {
  //       setRealCurrentDate(new Date());
  //       scheduleUpdate();
  //     }, timeToMidnight);
  //   };

  //   scheduleUpdate();
  // }, []);

  // // by clicking this button we setCurrentDate to be the realCurrentDate(todays date, later todays week)
  // // and by extension next and previous week works with "currentDate" then buttons will change the week number too
  // const goToCurrentWeek = () => {
  //   setCurrentDate(new Date(realCurrentDate));
  // };

  // const goToNextWeek = () => {
  //   // Create nextWeek object and assign date with current date
  //   const nextWeek = new Date(currentDate);
  //   // setDate() method set the day of the month to a specified date (Friday)
  //   // we set the day of the month to be 7 days ahead of the current date (next Friday)
  //   // we move based on the day of the month, not of the date.
  //   nextWeek.setDate(nextWeek.getDate() + DAYS_IN_WEEK);
  //   // nextWeek for example: Fri Nov 17 2023 21:45:28 GMT+0100 (Central European Standard Time)
  //   // then nextWeek for example: Fri Nov 24 2023 21:45:28 GMT+0100 (Central European Standard Time)

  //   const twelveWeeksAhead = new Date(realCurrentDate);
  //   // this is the object is 84 days (12 weeks) ahead of the todays date
  //   // this will always be 84 days ahead of the todays date
  //   twelveWeeksAhead.setDate(twelveWeeksAhead.getDate() + WEEKS_IN_PERIOD * DAYS_IN_WEEK);

  //   // when comparing to date objects we need to use >= or <= so javascript can convert
  //   // them into milliseconds and compare
  //   if (nextWeek <= twelveWeeksAhead) {
  //     setCurrentDate(nextWeek);
  //   } else {
  //     dispatch(toggleModalPagination());
  //   }
  // };

  // const goToPreviousWeek = () => {
  //   const prevWeek = new Date(currentDate);
  //   prevWeek.setDate(prevWeek.getDate() - DAYS_IN_WEEK);
  //   const twelveWeeksBehind = new Date(realCurrentDate);
  //   twelveWeeksBehind.setDate(
  //     twelveWeeksBehind.getDate() - WEEKS_IN_PERIOD * DAYS_IN_WEEK
  //   );

  //   if (prevWeek >= twelveWeeksBehind) {
  //     setCurrentDate(prevWeek);
  //   } else {
  //     dispatch(toggleModalPagination());
  //   }
  // };

  // const previousWeekDate = new Date(currentDate);
  // previousWeekDate.setDate(previousWeekDate.getDate() - DAYS_IN_WEEK);

  // const nextWeekDate = new Date(currentDate);
  // nextWeekDate.setDate(nextWeekDate.getDate() + DAYS_IN_WEEK);

  // const getWeekNumber = (date: Date) => {
  //   return format(date, "w");
  // };

  return (
    <div>
      {isPaginationModalVisible && <PaginationModal />}
      <ToastContainer />
      <div className="relative mt-2 sm:mx-0 mx-auto pt-4 pr-4 pl-4 bg-white w-full">
        <div className="mb-4 flex sm:flex-row flex-col items-center gap-2">
          <MainTitleAndButtonAction title="Add Shift" />
        </div>
        <hr className="h-px mb-4 bg-gray-200 border-0" />
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pt-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader
                eachDayOfInterval={eachDayOfInterval}
                startDate={startDate}
                endDate={endDate}
              />
              <tbody className="bg-white">
                {employeeList.map((employee) => (
                  <TableBodyRow
                    key={employee.id_employee}
                    id_employee={employee.id_employee}
                    employee_zone_name={employee.zone}
                    id_zone={employee.id_zone}
                    employee_name={employee.name}
                    eachDayOfInterval={eachDayOfInterval}
                    startDate={startDate}
                    endDate={endDate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isVisible && <ShiftModal />}
      {isVisibleDelete && <ModalDeleteShift />}

      {/* Pagination */}
      <div className="sticky right-0 left-0 z-10 bottom-0 flex flex-row justify-center">
        {/* Previous week: example week 45 */}
        <div
          onClick={goToPreviousWeek}
          className="flex flex-col items-center justify-start md:text-sm text-xs border min-w-[40px] w-full border-gray-300 cursor-pointer sm:px-4 pr-[5px] py-[10px] gap-[3px] bg-[#F7F7F7]"
        >
          <button>
            <BsFillArrowLeftCircleFill size={22} />
          </button>
          <div className="flex flex-col items-center justify-center sm:flex-row gap-1">
            <p className="text-xs font-semibold">Week</p>
            <p className="text-xs font-semibold">{getWeekNumber(previousWeekDate)}</p>
          </div>
        </div>
        {/* Current week: example week 46 */}
        <div
          onClick={goToCurrentWeek}
          className="flex flex-col items-center justify-center md:text-sm text-xs border w-full border-gray-300 cursor-pointer bg-[#F7F7F7] gap-[3px] py-[10px]"
        >
          <button className="bg-gray-600 p-[3px] text-gray-200 rounded-[50%] h-[22px] w-[22px] flex items-center justify-center">
            <TbReload size={22} />
          </button>
          <div className="flex flex-col items-center justify-center text-center sm:flex-row gap-1">
            <p className="text-xs font-semibold">Current Week</p>
            <p className="text-xs font-semibold">{getWeekNumber(realCurrentDate)}</p>
          </div>
        </div>
        {/* Next week: example week 47 */}
        <div
          onClick={goToNextWeek}
          className="flex flex-col items-center justify-start md:text-sm text-xs border min-w-[40px] w-full border-gray-300 cursor-pointer sm:px-4 pr-[5px] py-[10px] gap-[3px] bg-[#F7F7F7]"
        >
          <button>
            <BsFillArrowRightCircleFill size={22} />
          </button>
          <div className="flex flex-col items-center justify-center sm:flex-row gap-1">
            <p className="text-xs font-semibold">Week</p>
            <p className="text-xs font-semibold">{getWeekNumber(nextWeekDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShift;
