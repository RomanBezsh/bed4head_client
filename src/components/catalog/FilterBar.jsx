import MapPinButton from "./MapPinButton.jsx";
import Filter from "./Filter";
import catalogSettingsIcon from "../../assets/icons/catalog/catalog_settings_icon.svg";
import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";

// Top bar for mobile devices (replaces sidebar)
const MobileTopBar = ({ onMapClick, mapDisabled }) => {
    return (
        // Visible only on mobile (hidden on lg and above)
        <div className="flex w-full items-center gap-3 lg:hidden">

            {/* Filter button (can later open modal/drawer) */}
            <button
                type="button"
                className="flex h-10 flex-1 items-center justify-between rounded-[30px] border border-gray bg-white px-4"
            >
                <span className="text-[14px] font-normal text-[#717171]">
                    Filter
                </span>
                <img
                    src={catalogSettingsIcon}
                    alt="filter settings"
                    className="h-5 w-5"
                />
            </button>

            {/* Map button (redirects to Google Maps) */}
            <button
                type="button"
                onClick={onMapClick}
                disabled={mapDisabled}
                className="flex h-10 flex-1 items-center justify-between rounded-[30px] border border-gray bg-white pl-4 pr-3"
            >
                <span className="text-[14px] font-normal text-[#EE0039]">
                    See the map
                </span>
                <img
                    src={mapPinIcon}
                    alt="map pin"
                    className="h-5 w-5"
                />
            </button>
        </div>
    );
};

// Main filter container
const FilterBar = ({ onMapClick, mapDisabled = false, hotels = [], filters, onFiltersChange }) => {
    return (
        <>
            {/* Mobile version (top bar) */}
            <MobileTopBar onMapClick={onMapClick} mapDisabled={mapDisabled} />

            {/* Desktop version (sidebar with full filters) */}
            <div className="hidden shrink-0 lg:flex lg:flex-col lg:gap-8">
                <MapPinButton onClick={onMapClick} disabled={mapDisabled} />
                <Filter hotels={hotels} filters={filters} onFiltersChange={onFiltersChange} />
            </div>
        </>
    );
};

export default FilterBar;
