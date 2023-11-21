import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval } from "date-fns";
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchEmployees } from "../../../slices/employees/employeeSlice";

interface Props {
  startDate: Date;
  endDate: Date;
  filteredEmployeeList?: Employee[];
}

interface Employee {
  name: string;
  id_number: string | null;
  id_employee: number | null;
  birthday: string | null;
  email: string | null;
  id_zone: number | null;
  zone: string | null;
  is_active: boolean;
  mobile_number: string | null;
}

const Table: React.FC<Props> = ({ endDate, startDate, filteredEmployeeList }) => {
  const dispatch: AppDispatch = useDispatch();

  const { employeeList } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <TableHeader
        eachDayOfInterval={eachDayOfInterval}
        startDate={startDate}
        endDate={endDate}
      />
      <tbody className="bg-white">
        {(filteredEmployeeList ?? employeeList).map((employee) => (
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
  );
};

export default Table;
