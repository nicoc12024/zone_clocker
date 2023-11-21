import { useState } from "react";
import MainTitleAndButtonAction from "../../../sharedComponents/MainTitleAndButtonAction";
import SearchEmployeeInput from "./SearchEmployeeInput";
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";
import { useEffect } from "react";
import { fetchEmployees } from "../../../slices/employees/employeeSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import ModalDeleteEmployee from "./ModalDeleteEmployee";

interface Employee {
  name: string;
  id_number: string | null;
  id_employee?: number | null;
  birthday?: string | null;
  email?: string | null;
  zone: string | null;
  is_active: boolean;
  mobile_number?: string | null;
  id_zone: number | null;
}

export default function ListOfEmployees() {
  const [searchEmployee, setSearchEmployee] = useState<string>("");
  const { isVisible } = useSelector((state: RootState) => state.employee);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const { employeeList } = useSelector((state: RootState) => state.employee);

  const filteredEmployeeList = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchEmployee.toLowerCase())
  );

  return (
    <div className="my-2 sm:mx-0 mx-auto p-4 bg-white w-full overflow-x-hidden">
      <div className="sm:mb-8 mb-4">
        <div className="sm:mb-8 mb-4 flex sm:flex-row flex-col items-center gap-2">
          <MainTitleAndButtonAction
            title="List of employees"
            callToAction="Add new employee"
            url="add-employee"
          />
        </div>
        <SearchEmployeeInput
          searchEmployee={searchEmployee}
          setSearchEmployee={setSearchEmployee}
        />
      </div>
      <div>
        <h2 className="font-medium sm:text-xl text-sm mb-4 text-gray-600">
          Total employees: {employeeList.length}
        </h2>
        <hr className="h-px sm:my-2 my-0 bg-gray-200 border-0" />
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader />
              <tbody className="bg-white">
                {filteredEmployeeList.map((person: Employee) => (
                  <TableBodyRow person={person} key={person.id_employee} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isVisible && <ModalDeleteEmployee />}
    </div>
  );
}
