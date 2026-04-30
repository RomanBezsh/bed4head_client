import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";

const MapPinButton = ({ onClick, disabled = false }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="
                flex h-10 w-full max-w-[271px]
                items-center justify-between
                rounded-[30px] border border-gray bg-white
                pl-6 pr-3
                disabled:cursor-not-allowed disabled:opacity-50
            "
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
        </button>
    );
};

export default MapPinButton;
