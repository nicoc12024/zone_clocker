import { ModalCreateAccount } from "./ModalCreateAccount";
import TableOfAccounts from "./TableOfAccounts";
import MainTitleAndButtonAction from "../../sharedComponents/MainTitleAndButtonAction";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleModal } from "../../slices/account/accountSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { ToastContainer } from "react-toastify";
import { ModalModifyAccount } from "./ModalModifyAccount";

export default function Account() {
  const dispatch: AppDispatch = useDispatch();

  const { isVisibleCreateAccount, isVisibleEditAccount } = useSelector(
    (state: RootState) => state.account
  );

  return (
    <div className="my-2 sm:mx-0 mx-auto p-4 bg-white min-w-[20px] max-w-[700px]">
      <div className="mb-4 flex sm:flex-row flex-col items-center gap-2">
        <MainTitleAndButtonAction
          title="Add new admin account"
          callToAction="Add new admin account"
          openModal={() => {
            dispatch(toggleModal());
          }}
        />
      </div>
      <hr className="h-px mb-4 bg-gray-200 border-0" />
      <TableOfAccounts />
      <p className="text-xs mt-4">
        Do you want to delete an admin account? Send email to:
        supportzoneclocker@gmail.com
      </p>
      <ToastContainer />
      {isVisibleCreateAccount && <ModalCreateAccount />}
      {isVisibleEditAccount && <ModalModifyAccount />}
    </div>
  );
}
