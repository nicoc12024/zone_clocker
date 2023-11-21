import { useEffect } from "react";
import TableBodyRow from "./TableBodyRow";
import TableHeader from "./TableHeader";
import { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../slices/account/accountSlice";

function TableOfAccounts() {
  const dispatch: AppDispatch = useDispatch();

  const { accountList } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full pt-2 align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white">
            {accountList.map((account) => (
              <TableBodyRow key={account.id_admin} account={account} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableOfAccounts;
