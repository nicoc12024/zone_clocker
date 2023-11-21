import MapComponent from "./MapComponent";
import { toggleModal } from "../../../slices/zones/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useAddZone } from "./utilsAddNewZone";
import { resetState } from "../../../slices/zones/zonesSlice";

interface Radius {
  id: number;
  meters: number;
}

const radiusArray: Radius[] = [
  {
    id: 1,
    meters: 200,
  },
  {
    id: 2,
    meters: 500,
  },
  {
    id: 3,
    meters: 1000,
  },
];

export default function TableHeader() {
  const dispatch: AppDispatch = useDispatch();
  const { name, radius } = useSelector((state: RootState) => state.zones);
  const { onSubmitZoneModal, handleRadiusChange, handleNameChange, nameError } =
    useAddZone();

  return (
    <form onSubmit={onSubmitZoneModal}>
      <div className="mb-2 flex sm:flex-row flex-col items-start">
        <label
          htmlFor="name"
          className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
        >
          Name *
        </label>
        <div className="flex flex-col w-full">
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
            required
            maxLength={25}
          />
          {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-start">
        <label
          htmlFor="radius"
          className="block sm:text-sm text-xs text-right my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
        >
          Radius (meters)
        </label>
        <select
          id="radius"
          value={radius}
          onChange={handleRadiusChange}
          className="mt-1 p-2 border rounded-md text-xs w-[100%] cursor-pointer"
        >
          <option value="None" disabled>
            None
          </option>
          {radiusArray.map((r) => (
            <option key={r.id} value={r.meters}>
              {r.meters}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-right py-3">Click on the map to add the radius area</p>
      <MapComponent />
      {/* Modal footer */}
      <div className="flex items-center justify-end pt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={() => {
            dispatch(toggleModal());
            dispatch(resetState());
          }}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Save
        </button>
      </div>
    </form>
  );
}
