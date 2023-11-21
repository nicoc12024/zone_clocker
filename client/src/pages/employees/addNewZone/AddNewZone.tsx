declare module "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import ModalAddNewZone from "./ModalAddNewZone";
import MainTitleAndButtonAction from "../../../sharedComponents/MainTitleAndButtonAction";
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchZones } from "../../../slices/zones/zonesSlice";
import { toggleModal } from "../../../slices/zones/modalSlice";
import { RootState, AppDispatch } from "../../../store/store";
import ModalDeleteZone from "./ModalDeleteZone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNewZone() {
  const dispatch: AppDispatch = useDispatch();
  const { zoneList } = useSelector((state: RootState) => state.zones);
  const { isVisible, isVisibleDelete } = useSelector((state: RootState) => state.modal);

  // Fetch zones from database and set them in the store
  useEffect(() => {
    dispatch(fetchZones());
  }, [dispatch]);

  return (
    <div className="my-2 sm:mx-0 mx-auto p-4 bg-white w-full">
      <div className="mb-4 flex sm:flex-row flex-col items-center gap-2">
        <MainTitleAndButtonAction
          title="Zones"
          callToAction="Add new zone"
          openModal={() => {
            dispatch(toggleModal());
          }}
        />
      </div>
      <div>
        <h2 className="font-medium sm:text-xl text-sm mb-4 text-gray-600">
          Total places: {zoneList.length}
        </h2>
        <hr className="h-px sm:my-2 my-0 bg-gray-200 border-0" />
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader />
              <tbody className="bg-white">
                {zoneList.map((place) => (
                  <TableBodyRow key={place.id_zone} placeObject={place} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
      {isVisible && <ModalAddNewZone />}
      {isVisibleDelete && <ModalDeleteZone />}
    </div>
  );
}
