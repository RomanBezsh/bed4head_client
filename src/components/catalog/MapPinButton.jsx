import { NavLink } from "react-router";
import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";

const MapPinButton = () => {
    return (
        // Link button that redirects user to Google Maps
        <NavLink
            className="
                flex h-10 w-full max-w-[271px]
                items-center justify-between
                rounded-[30px] border border-gray bg-white
                pl-6 pr-3
            "
            to="https://www.google.com.ua/maps?ie=UTF8&hl=uk"
        >
            {/* Button text */}
            <span className="text-[16px] font-normal text-[#EE0039]">
                See the map
            </span>

            {/* Map pin icon */}
            <img
                src={mapPinIcon}
                alt="map pin"
                className="h-5 w-5"
            />
        </NavLink>
    );
};

export default MapPinButton;