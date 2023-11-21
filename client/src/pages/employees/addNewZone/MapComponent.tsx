import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { setSelectedCoordinates } from "../../../slices/zones/zonesSlice";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const MapComponent: React.FC = () => {
  // Used when editing a zone to pre-fill form with zone data
  const { selectedCoordinates, radius } = useSelector((state: RootState) => state.zones);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // Check if the map is already initialized
    const container = L.DomUtil.get("map");
    if (container != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (container as any)._leaflet_id = null;
    }

    let map: L.Map;
    let circle: L.Circle | null = null;

    // Editing mode shows the red circle on the map when the modal is opened
    if (selectedCoordinates?.lat && selectedCoordinates?.lng) {
      map = L.map("map").setView([selectedCoordinates.lat, selectedCoordinates.lng], 13);
      // Remove existing circle
      if (circle) {
        map.removeLayer(circle);
      }

      // Draw new circle
      circle = L.circle([selectedCoordinates.lat, selectedCoordinates.lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: radius ? radius : 200,
      }).addTo(map);
    } else {
      // Creating mode with default location
      map = L.map("map").setView([51.505, -0.09], 13);
    }

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handler for click event
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      dispatch(setSelectedCoordinates({ lat, lng }));

      // Remove existing circle
      if (circle) {
        map.removeLayer(circle);
      }

      // Draw new circle
      circle = L.circle([lat, lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: radius ? radius : 200,
      }).addTo(map);
    };

    // Register click event
    map.on("click", onMapClick);

    // Cleanup map when unmounted
    return () => {
      map.off("click", onMapClick); // Remove click event listener
      map.remove(); // Remove map
    };
  }, [radius, dispatch, selectedCoordinates]);

  return <div id="map" className="h-[200px] sm:h-[300px] w-full" />;
};

export default MapComponent;
