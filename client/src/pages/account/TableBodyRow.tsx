import { MdOutlineModeEditOutline } from "react-icons/md";
import { setFormInputs, toggleEditModal } from "../../slices/account/accountSlice";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

interface AccountProps {
  name: string;
  email: string;
  id_admin?: number;
  id_company?: number;
  password?: string;
}

interface TBodyRowProps {
  account: AccountProps;
}

function TableBodyRow({ account }: TBodyRowProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <tr className="even:bg-gray-50 border-b border-gray-200 ">
      <td className="whitespace-nowrap py-4 px-3 text-xs text-gray-600 border-r border-gray-200">
        {account.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 border-r border-gray-200">
        {account.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 border-r border-gray-200">
        *********
      </td>
      <td className="whitespace-nowrap text-xs">
        <div className="flex items-center justify-start px-3 gap-1 ">
          <div
            onClick={() => {
              dispatch(toggleEditModal());
              // We dispatch the account data so we can show it in ModalModifyAccount when we open it
              // and we do the local state management in useAccount then finally we dispatch it again
              dispatch(
                setFormInputs({
                  name: account.name,
                  email: account.email,
                  password: "",
                  id_admin: account.id_admin,
                  id_company: account.id_company,
                })
              );
            }}
            className="bg-[#e9e9e9] py-[3px] px-[7px] rounded flex items-center gap-[2px] cursor-pointer"
          >
            <MdOutlineModeEditOutline /> Edit
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableBodyRow;
