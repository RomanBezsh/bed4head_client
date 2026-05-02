import { useState, useEffect } from "react";
import MapPinButton from "./MapPinButton.jsx";
import Filter from "./Filter";
import catalogSettingsIcon from "../../assets/icons/catalog/catalog_settings_icon.svg";
import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";
import closerIcon from "../../assets/icons/common/closer_icon.svg";

// Top bar for mobile devices (replaces sidebar)
const MobileTopBar = ({ onMapClick, mapDisabled, onFilterOpen }) => {
    return (
        // Visible only on mobile (hidden on lg and above)
        <div className="flex w-full items-center gap-3 lg:hidden">
            {/* Filter button (can later open modal/drawer) */}
            <button
                type="button"
                onClick={onFilterOpen}
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
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Блокируем прокрутку страницы при открытых фильтрах
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileFilterOpen]);

    return (
        <>
            {/* Mobile version (top bar) */}
            <MobileTopBar 
                onMapClick={onMapClick} 
                mapDisabled={mapDisabled} 
                onFilterOpen={() => setIsMobileFilterOpen(true)} 
            />

            {/* Mobile Filter Overlay */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden">
                    <div className="flex items-center justify-between border-b border-gray p-4">
                        <h2 className="text-[20px] font-bold text-[#581ADB]">Filters</h2>
                        <button 
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                        >
                            <img src={closerIcon} alt="Close" className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 flex justify-center">
                        <Filter hotels={hotels} filters={filters} onFiltersChange={onFiltersChange} />
                    </div>

                    <div className="border-t border-gray p-4 bg-white">
                        <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="h-14 w-full rounded-full bg-[#581ADB] text-[16px] font-bold text-white shadow-[0_4px_15px_rgba(88,26,219,0.3)]"
                        >
                            Show results
                        </button>
                    </div>
                </div>
            )}

            {/* Desktop version (sidebar with full filters) */}
            <div className="hidden shrink-0 lg:flex lg:flex-col lg:gap-8">
                <MapPinButton onClick={onMapClick} disabled={mapDisabled} />
                <Filter hotels={hotels} filters={filters} onFiltersChange={onFiltersChange} />
            </div>
        </>
    );
};

export default FilterBar;
