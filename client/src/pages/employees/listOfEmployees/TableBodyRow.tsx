import { MdOutlineModeEditOutline, MdDeleteForever } from "react-icons/md";
import calculateAge from "../../../utilities/calculateAge";
import { Link } from "react-router-dom";
import { setFormInputs } from "../../../slices/employees/employeeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { toggleModal } from "../../../slices/employees/employeeSlice";

interface Employee {
  name: string;
  id_number: string | null;
  id_employee?: number | null;
  birthday?: string | null;
  email?: string | null;
  zone: string | null;
  id_zone: number | null;
  is_active: boolean;
  mobile_number?: string | null;
}

export default function TableBodyRow({ person }: { person: Employee }) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <tr key={person.id_employee} className="even:bg-gray-50">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3">
        {person.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.zone}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {person.id_number}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {person.mobile_number}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {person.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {person.birthday}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {person.birthday ? calculateAge(person.birthday) : ""}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {person.is_active ? "Active" : "Inactive"}
      </td>
      <td className="whitespace-nowrap text-xs ">
        <div className="flex items-center justify-start gap-1">
          <Link
            state={{ person }}
            to={"/edit-employee"}
            className="bg-[#e9e9e9] py-[3px] px-[7px] rounded flex items-center gap-[2px]"
            onClick={() =>
              dispatch(
                setFormInputs({
                  id_number: person.id_number,
                  id_employee: person.id_employee,
                  name: person.name,
                  email: person.email,
                  mobile_number: person.mobile_number,
                  birthday: person.birthday,
                  is_active: person.is_active,
                  zone: person.zone,
                  id_zone: person.id_zone ? person.id_zone : null,
                })
              )
            }
          >
            <MdOutlineModeEditOutline /> Edit
          </Link>
          <button
            onClick={() => {
              dispatch(
                setFormInputs({
                  id_employee: person.id_employee,
                })
              );
              dispatch(toggleModal());
            }}
            className="bg-[#e9e9e9] py-[3px] px-[7px] rounded flex items-center gap-[2px]"
          >
            <MdDeleteForever /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
