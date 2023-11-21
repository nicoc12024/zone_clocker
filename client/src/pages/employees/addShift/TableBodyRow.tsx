import { format } from "date-fns";
import { MdOutlineModeEditOutline, MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts, setShift } from "../../../slices/shift/shiftSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { toggleModal, toggleModalDelete } from "../../../slices/shift/shiftSlice";
import { useEffect } from "react";
import { useAuth } from "../../../context/useAuth";
import { useShiftEmployee } from "./useShiftEmployee";

interface EachDayOfIntervalProps {
  start: Date;
  end: Date;
}

interface TableBodyRowProps {
  employee_zone_name: string | null;
  id_zone: number | null;
  employee_name: string;
  eachDayOfInterval: (interval: EachDayOfIntervalProps) => Date[];
  startDate: Date;
  endDate: Date;
  id_employee: number | undefined | null;
}

export default function TableBodyRow({
  employee_zone_name,
  id_zone,
  employee_name,
  eachDayOfInterval,
  startDate,
  endDate,
  id_employee,
}: TableBodyRowProps) {
  const dispatch: AppDispatch = useDispatch();

  const { currentUser } = useAuth();

  const { shiftList } = useSelector((state: RootState) => state.shift);

  // Fetch shifts
  useEffect(() => {
    dispatch(fetchShifts());
  }, [dispatch]);

  // Filter shifts for the current employee
  const shiftsForEmployee = shiftList?.filter(
    (shift) => shift.id_employee === id_employee
  );

  const {
    handleCheckIn,
    handleCheckOut,
    getCurrentTimeFormatted,
    handleResetCheckOut,
    handleResetCheckInCheckOut,
    gerCurrentDateFormatted,
    openModalForShift,
    closeModalForShift,
    activeShiftForModal,
    openCheckOutModalForShift,
    closeCheckOutModalForShift,
    activeShiftForCheckOutModal,
  } = useShiftEmployee();

  return (
    <tr className="even:bg-gray-50 border-b border-gray-200 ">
      <td className="whitespace-nowrap py-4 px-3 text-xs font-medium text-gray-600 border-r border-gray-200">
        {employee_name}
      </td>
      {eachDayOfInterval({ start: startDate, end: endDate }).map((day) => {
        // This process retrieves the specific shift for each employee for each day of the interval.
        // Iterate over each day in the interval defined by startDate and endDate, one week.
        // Format each day of the interval to 'yyyy-MM-dd' to align with the date format used in the database.
        // For each day, find the shift that corresponds to the current employee (we iterate employeeList in AddShift.tsx).

        const formattedDay = format(day, "yyyy-MM-dd"); // 2021-09-01
        const shiftForDay = shiftsForEmployee?.find(
          (shift) => shift.date === formattedDay
        ); // 2021-09-01

        return (
          <td
            key={formattedDay}
            className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 border-r border-gray-200 align-top"
          >
            <div className="py-1">
              <div className="flex flex-col justify-start items-start">
                {shiftForDay ? (
                  <>
                    <div className="flex flex-row">
                      <p className="mb-1">
                        Schedule: {`${shiftForDay.start_time} to ${shiftForDay.end_time}`}
                      </p>
                      {currentUser?.userType === "admin" && (
                        <div className="flex flex-row">
                          <MdOutlineModeEditOutline
                            className="cursor-pointer m-1"
                            onClick={() => {
                              dispatch(toggleModal());
                              if (id_employee) {
                                dispatch(
                                  setShift({
                                    id_employee,
                                    date: formattedDay,
                                    employee_name,
                                    id_zone,
                                    start_time: shiftForDay.start_time,
                                    end_time: shiftForDay.end_time,
                                    id_shift: shiftForDay.id_shift,
                                  })
                                );
                              }
                            }}
                          />
                          <MdDeleteForever
                            className="cursor-pointer m-1"
                            onClick={() =>
                              dispatch(toggleModalDelete(shiftForDay.id_shift))
                            }
                          />
                        </div>
                      )}
                    </div>
                    {currentUser?.userType === "admin" && (
                      <div className="flex flex-col items-start justify">
                        <p className="mb-1">
                          Checked in:{" "}
                          {shiftForDay.check_in ? shiftForDay.check_in : "Not yet"}{" "}
                          {shiftForDay.check_in_date}
                        </p>
                        <p className="mb-1">
                          Checked out:{" "}
                          {shiftForDay.check_out ? shiftForDay.check_out : "Not yet"}{" "}
                          {shiftForDay.check_out_date}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  currentUser?.userType === "admin" && (
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(toggleModal());
                        if (id_employee) {
                          dispatch(
                            setShift({
                              id_employee,
                              date: formattedDay,
                              employee_name,
                              id_zone,
                            })
                          );
                        }
                      }}
                      className="text-blue-500 hover:underline text-xs text-center w-full focus:outline-none mt-2"
                    >
                      Add
                    </button>
                  )
                )}
              </div>

              {/* Employee check in and check out actions */}
              {currentUser?.userType === "employee" && (
                <>
                  {/* Check in not done */}
                  {!shiftForDay?.check_in &&
                    !shiftForDay?.check_out &&
                    shiftForDay?.start_time &&
                    shiftForDay?.end_time && (
                      <>
                        <div
                          className="mt-2 p-1 border-2  text-center text-white bg-green-700 cursor-pointer"
                          onClick={() => {
                            handleCheckIn(
                              shiftForDay.id_shift!,
                              getCurrentTimeFormatted(),
                              gerCurrentDateFormatted()
                            );
                          }}
                        >
                          <p>Check in</p>
                        </div>
                      </>
                    )}

                  {/* Check in and Check out done */}
                  {shiftForDay?.check_in && shiftForDay?.check_out && (
                    <>
                      <p className="mt-2 py-1 px-4 text-left border-2 border-dashed">
                        Check in date: {shiftForDay?.check_in_date}
                        <br />
                        Checked in at {shiftForDay?.check_in}
                      </p>
                      <p className="mt-2 p-1 px-4 text-left border-2 border-dashed">
                        Check out date: {shiftForDay?.check_out_date}
                        <br />
                        Checked out at {shiftForDay?.check_out}
                      </p>

                      {/* Reset Check in adn Check out */}
                      <div
                        onClick={() => {
                          if (activeShiftForModal !== shiftForDay.id_shift) {
                            openModalForShift(shiftForDay.id_shift!);
                          } else {
                            closeModalForShift();
                          }
                        }}
                        className="mt-2 p-1 text-center border-2 border-dashed bg-slate-200 cursor-pointer"
                      >
                        {activeShiftForModal !== shiftForDay.id_shift && (
                          <p>
                            Reset Check in <br /> and Check out
                          </p>
                        )}
                        {/* Confirmation (are you sure yes/no) */}
                        {activeShiftForModal === shiftForDay.id_shift && (
                          <div>
                            <p>Are you sure?</p>
                            <div className="flex gap-2 items-center justify-center">
                              <p
                                className="bg-slate-400 text-white py-[2px] px-2 m-1 rounded-md cursor-pointer"
                                onClick={closeModalForShift}
                              >
                                No
                              </p>
                              <p
                                className="bg-slate-400 text-white py-[2px] px-2 rounded-md cursor-pointer"
                                onClick={() =>
                                  handleResetCheckInCheckOut(
                                    shiftForDay.id_shift!,
                                    null,
                                    null
                                  )
                                }
                              >
                                Yes
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Reset Check in adn Check out */}
                      <div
                        onClick={() => {
                          if (activeShiftForCheckOutModal !== shiftForDay.id_shift) {
                            openCheckOutModalForShift(shiftForDay.id_shift!);
                          } else {
                            closeCheckOutModalForShift();
                          }
                        }}
                        className="mt-2 p-1 text-center border-2 border-dashed bg-slate-200 cursor-pointer"
                      >
                        {activeShiftForCheckOutModal !== shiftForDay.id_shift && (
                          <p>Reset Check out</p>
                        )}
                        {activeShiftForCheckOutModal === shiftForDay.id_shift && (
                          <div>
                            <p>Are you sure?</p>
                            <div className="flex gap-2 items-center justify-center">
                              <p
                                className="bg-slate-400 text-white py-[2px] px-2 m-1 rounded-md cursor-pointer"
                                onClick={closeCheckOutModalForShift}
                              >
                                No
                              </p>
                              <p
                                className="bg-slate-400 text-white py-[2px] px-2 rounded-md cursor-pointer"
                                onClick={() =>
                                  handleResetCheckOut(
                                    shiftForDay.id_shift!,
                                    shiftForDay.check_out_date!,
                                    shiftForDay.check_out!,
                                    shiftForDay.check_in!
                                  )
                                }
                              >
                                Yes
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Check in done but not check out */}
                  {shiftForDay?.check_in && !shiftForDay?.check_out && (
                    <>
                      <p className="mt-2 p-1 text-center border-2 border-dashed">
                        Check in date: {shiftForDay?.check_in_date}
                        <br />
                        Checked in at {shiftForDay?.check_in}
                      </p>
                      <div
                        onClick={() =>
                          handleCheckOut(
                            shiftForDay.id_shift!,
                            getCurrentTimeFormatted(),
                            gerCurrentDateFormatted()
                          )
                        }
                        className="mt-2 p-1 border-2  text-center text-white bg-yellow-500 cursor-pointer"
                      >
                        <p>Check out</p>
                      </div>
                    </>
                  )}

                  {/* If there is no start_time and end_time then null, no action can be perform or displayed */}
                  {!shiftForDay?.start_time && !shiftForDay?.end_time && null}
                </>
              )}

              <p>Place of work: {employee_zone_name}</p>
            </div>
          </td>
        );
      })}
    </tr>
  );
}
