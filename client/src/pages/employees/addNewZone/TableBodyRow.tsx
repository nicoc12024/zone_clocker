import { toggleModal, toggleModalDelete } from "../../../slices/zones/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { MdDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import { setFormInputs, setSelectedCoordinates } from "../../../slices/zones/zonesSlice";

interface ZoneData {
  id_company: number;
  id_zone: number;
  latitude: number;
  longitude: number;
  name: string;
  radius: number;
}

function TableBodyRow({ placeObject }: { placeObject: ZoneData }) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <tr className="even:bg-gray-50">
      <td className="w-[500px] whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-600 sm:pl-3">
        {placeObject.name}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-3">
        <div className="flex items-center justify-start gap-1">
          <a
            onClick={() => {
              dispatch(
                setFormInputs({
                  name: placeObject.name,
                  radius: placeObject.radius,
                  id_zone: placeObject.id_zone,
                })
              );
              dispatch(
                setSelectedCoordinates({
                  lat: placeObject.latitude,
                  lng: placeObject.longitude,
                })
              );
              dispatch(toggleModal());
            }}
            className="bg-[#e9e9e9] py-[3px] px-[7px] rounded flex items-center gap-[2px] cursor-pointer"
          >
            <MdOutlineModeEditOutline className="cursor-pointer" />
            Edit
          </a>
          <button
            onClick={() => {
              dispatch(toggleModalDelete(placeObject.id_zone));
              // dispatch(resetState());
            }}
            className="bg-[#e9e9e9] py-[3px] px-[7px] rounded flex items-center gap-[2px] cursor-pointer"
          >
            <MdDeleteForever /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableBodyRow;
