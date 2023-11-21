import { Dispatch, SetStateAction } from "react";

interface SearchEmployeeInputProps {
  searchEmployee: string;
  setSearchEmployee: Dispatch<SetStateAction<string>>;
}
export default function SearchEmployeeInput({
  searchEmployee,
  setSearchEmployee,
}: SearchEmployeeInputProps) {
  return (
    <form className="w-full sm:p-5 p-2 bg-[#ededed] rounded">
      <input
        type="text"
        id="searchEmployee"
        value={searchEmployee}
        onChange={(e) => setSearchEmployee(e.target.value)}
        className="mt-1 p-2 border rounded text-xs w-[100%] focus:outline-none"
        required
        placeholder="Search employee by name"
      />
    </form>
  );
}
