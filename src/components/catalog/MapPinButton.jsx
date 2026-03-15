import {NavLink} from "react-router";
import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";

const MapPinButton = () => {
    return (
        <NavLink className="w-67.75 h-10 flex flex-row items-center border border-gray rounded-[30px] justify-between pl-6 pr-2"
                 to="https://www.google.com.ua/maps?ie=UTF8&hl=uk">
            <span className="text-[#EE0039] text-[16px] font-normal">See the map</span>
            <img src={mapPinIcon} alt="map pin"/>
        </NavLink>
    );

}

export default MapPinButton;