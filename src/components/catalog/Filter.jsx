import loupeIcon from "../../assets/icons/catalog/loupe_icon.svg";
import chevronDownIcon from "../../assets/icons/common/chevron_down_icon.svg";

const normalize = (value) => String(value || "").trim().toLowerCase();

const countBy = (hotels, predicate) => hotels.filter(predicate).length;

const uniqueOptions = (hotels, getValue) => {
    const counts = new Map();

    hotels.forEach((hotel) => {
        const rawValue = getValue(hotel);
        if (!rawValue) return;

        const label = String(rawValue).trim();
        if (!label) return;

        counts.set(label, (counts.get(label) || 0) + 1);
    });

    return [...counts.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([label, count]) => ({ label, value: label, count }));
};

const createFilterSections = (hotels) => {
    const ratingOptions = [9, 8, 7, 6]
        .map((value) => ({
            label: `${value}+`,
            value,
            count: countBy(hotels, (hotel) => Number(hotel.rating) >= value),
        }))
        .filter((option) => option.count > 0);

    const popularOptions = [
        {
            label: "City centre",
            value: "city_centre",
            count: countBy(hotels, (hotel) => Number(hotel.distanceFromCenterKm) <= 1),
        },
        {
            label: "Popular places",
            value: "popular_places",
            count: countBy(hotels, (hotel) => Boolean(hotel.isFeatured)),
        },
        {
            label: "Best rating",
            value: "best_rating",
            count: countBy(hotels, (hotel) => Number(hotel.rating) >= 8),
        },
    ].filter((option) => option.count > 0);

    const starOptions = [5, 4, 3, 2, 1]
        .map((stars) => ({
            label: `${stars} star${stars === 1 ? "" : "s"}`,
            value: stars,
            count: countBy(hotels, (hotel) => Number(hotel.stars) === stars),
        }))
        .filter((option) => option.count > 0);

    const facilityCounts = new Map();
    hotels.forEach((hotel) => {
        (hotel.facilities || []).forEach((facility) => {
            const label = typeof facility === "string"
                ? facility.split("|||").at(-1).trim()
                : String(facility?.name || facility?.Name || "").trim();
            if (!label) return;
            facilityCounts.set(label, (facilityCounts.get(label) || 0) + 1);
        });
    });

    const facilityOptions = [...facilityCounts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 8)
        .map(([label, count]) => ({ label, value: label, count }));

    const hotelTypeOptions = uniqueOptions(hotels, (hotel) => hotel.hotelType);
    const cityOptions = uniqueOptions(hotels, (hotel) => hotel.city).slice(0, 8);

    return [
        { id: "rating", title: "Rating", options: ratingOptions },
        { id: "popular", title: "Popular", options: popularOptions },
        { id: "stars", title: "Stars", options: starOptions },
        { id: "facilities", title: "Facilities", hasMore: facilityOptions.length > 5, options: facilityOptions },
        { id: "hotelType", title: "Type of hotel", hasMore: hotelTypeOptions.length > 5, options: hotelTypeOptions },
        { id: "cities", title: "Cities", options: cityOptions },
    ].filter((section) => section.options.length > 0);
};

const getPriceBounds = (hotels) => {
    const prices = hotels
        .map((hotel) => Number(hotel.price))
        .filter((price) => Number.isFinite(price) && price > 0);

    if (prices.length === 0) {
        return { min: 0, max: 0 };
    }

    return {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices)),
    };
};

const Filter = ({ hotels = [], filters, onFiltersChange }) => {
    const selectedFilters = filters?.sections || {};
    const landmark = filters?.landmark || "";
    const { min, max } = getPriceBounds(hotels);
    const price = filters?.maxPrice ?? max;
    const sections = createFilterSections(hotels);

    const updateFilters = (nextFilters) => {
        onFiltersChange?.({
            sections: selectedFilters,
            landmark,
            maxPrice: price,
            ...filters,
            ...nextFilters,
        });
    };

    const handleCheckboxChange = (sectionId, value) => {
        const currentSectionValues = selectedFilters[sectionId] || [];
        const nextValues = currentSectionValues.includes(value)
            ? currentSectionValues.filter((item) => item !== value)
            : [...currentSectionValues, value];

        updateFilters({
            sections: {
                ...selectedFilters,
                [sectionId]: nextValues,
            },
        });
    };

    return (
        <div className="flex flex-col border border-gray w-68 text-[#717171] bg-white rounded-lg gap-0 divide-y divide-gray">
            <div className="flex flex-col gap-3 p-6">
                <h3 className="text-[16px] font-bold text-[#555555]">Price</h3>
                <div className="flex flex-row justify-between text-[16px]">
                    <span>{min}$ night</span>
                    <span>{price || max}$ night</span>
                </div>
                <div className="relative w-[222.53875732421875px] h-6">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#B3B3B3]" />
                    <input
                        type="range"
                        min={min}
                        max={max || min}
                        value={price || max || min}
                        disabled={max <= min}
                        onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
                        className="
                            absolute
                            inset-x-0
                            -translate-y-1/3
                            appearance-none
                            h-6
                            bg-transparent
                            cursor-pointer
                            disabled:cursor-not-allowed
                            [&::-webkit-slider-runnable-track]:h-0
                            [&::-webkit-slider-runnable-track]:bg-transparent
                            [&::-moz-range-track]:h-0
                            [&::-moz-range-track]:bg-transparent
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-[16px]
                            [&::-webkit-slider-thumb]:h-[16px]
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-white
                            [&::-webkit-slider-thumb]:border-[1.5px]
                            [&::-webkit-slider-thumb]:border-[#B3B3B3]
                            [&::-moz-range-thumb]:w-[16px]
                            [&::-moz-range-thumb]:h-[16px]
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:bg-white
                            [&::-moz-range-thumb]:border-[1.5px]
                            [&::-moz-range-thumb]:border-[#B3B3B3]
                        "
                    />
                </div>
            </div>

            <div className="relative px-6 py-6">
                <input
                    type="text"
                    value={landmark}
                    onChange={(event) => updateFilters({ landmark: event.target.value })}
                    placeholder="Attractions near..."
                    className="
                      w-56 h-10
                      pr-9
                      pl-4
                      border border-gray
                      rounded-[30px]
                      text-sm
                      outline-none
                    "
                />

                <span className="absolute right-9 top-1/2 -translate-y-1/2">
                    <img src={loupeIcon} alt="loupe" className="w-6 h-6" />
                </span>
            </div>

            {sections.map((section) => (
                <div key={section.id} className="w-full flex flex-col gap-4 px-6 py-6">
                    <h4 className="font-bold ">{section.title}</h4>

                    <ul className="flex flex-col gap-3.25 ">
                        {section.options.map((option) => (
                            <li className="flex flex-row justify-between w-56" key={`${section.id}-${option.value}`}>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={(selectedFilters[section.id] || []).includes(option.value)}
                                        onChange={() => handleCheckboxChange(section.id, option.value)}
                                        className="appearance-none w-4 h-4 border border-[#B3B3B3] rounded-full checked:bg-[#581ADB]"
                                    />

                                    <span className="text-[16px]">{option.label}</span>
                                </label>
                                <span>{option.count}</span>
                            </li>
                        ))}
                    </ul>

                    {section.hasMore && (
                        <button type="button">
                            <img src={chevronDownIcon} alt="chevron down" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export const matchesCatalogFilters = (hotel, filters) => {
    if (!filters) return true;

    const price = Number(hotel.price);
    const hasMaxPrice = filters.maxPrice !== null && filters.maxPrice !== undefined && filters.maxPrice !== "";
    if (hasMaxPrice && Number.isFinite(Number(filters.maxPrice)) && Number.isFinite(price) && price > Number(filters.maxPrice)) {
        return false;
    }

    if (filters.landmark) {
        const query = normalize(filters.landmark);
        const searchable = [
            hotel.name,
            hotel.city,
            hotel.country,
            hotel.description,
            ...(hotel.facilities || []),
        ].join(" ");
        if (!normalize(searchable).includes(query)) {
            return false;
        }
    }

    const sections = filters.sections || {};

    if (sections.rating?.length > 0 && !sections.rating.some((rating) => Number(hotel.rating) >= Number(rating))) {
        return false;
    }

    if (sections.popular?.length > 0) {
        const matchesPopular = sections.popular.some((value) => {
            if (value === "city_centre") return Number(hotel.distanceFromCenterKm) <= 1;
            if (value === "popular_places") return Boolean(hotel.isFeatured);
            if (value === "best_rating") return Number(hotel.rating) >= 8;
            return false;
        });

        if (!matchesPopular) return false;
    }

    if (sections.stars?.length > 0 && !sections.stars.includes(Number(hotel.stars))) {
        return false;
    }

    if (sections.facilities?.length > 0) {
        const hotelFacilities = (hotel.facilities || []).map((facility) => normalize(String(facility).split("|||").at(-1)));
        if (!sections.facilities.every((facility) => hotelFacilities.includes(normalize(facility)))) {
            return false;
        }
    }

    if (sections.hotelType?.length > 0 && !sections.hotelType.includes(hotel.hotelType)) {
        return false;
    }

    if (sections.cities?.length > 0 && !sections.cities.includes(hotel.city)) {
        return false;
    }

    return true;
};

export default Filter;
