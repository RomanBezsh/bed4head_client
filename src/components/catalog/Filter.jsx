import loupeIcon from "../../assets/icons/loupe_icon.svg"
import chevronDownIcon from "../../assets/icons/chevron_down_icon.svg"
import {useState} from "react";

const Filter = () => {


    const filtersData = [{
        id: "rating",
        title: "Rating",
        type: "checkbox",
        options: [{label: "9+", count: 99}, {label: "8+", count: 124}, {label: "7+", count: 198}, {
            label: "6+",
            count: 345
        },],
    }, {
        id: "popular",
        title: "Popular",
        type: "checkbox",
        options: [{label: "City centre", count: 435}, {label: "Popular places", count: 937}, {
            label: "Best rating",
            count: 45
        },],
    }, {
        id: "stars",
        title: "Stars",
        type: "checkbox",
        options: [{label: "5 stars", count: 135, stars: 5}, {label: "4 stars", count: 37, stars: 4}, {
            label: "3 stars",
            count: 45,
            stars: 3
        }, {label: "2 stars", count: 89, stars: 2}, {label: "1 star", count: 112, stars: 1},],
    }, {
        id: "facilities",
        title: "Facilities",
        type: "checkbox",
        hasMore: true,
        options: [{label: "Wi-Fi", count: 1135}, {label: "Restaurants", count: 337}, {
            label: "24/7",
            count: 345
        }, {label: "Food in the hotel", count: 589}, {label: "Bar", count: 112}, {
            label: "Children's area",
            count: 155
        },],
    }, {
        id: "hotel_type",
        title: "Type of hotel",
        type: "checkbox",
        hasMore: true,
        options: [{label: "Motel", count: 135}, {label: "Resort", count: 37}, {
            label: "Inn",
            count: 45
        }, {label: "All-suite", count: 89}, {label: "Conference center", count: 112},],
    }, {
        id: "chain_hotels",
        title: "Chain hotels",
        type: "checkbox",
        options: [
            { label: "Sapphire Suites", count: 1 },
            { label: "Ocean View Hotel", count: 2 },
            { label: "Sunflower Resort", count: 1 },
            { label: "Starlight Lodge", count: 3 },
            { label: "Paradise Plaza", count: 1 },
            { label: "Golden Sands Inn", count: 1 },
            { label: "Moonlight Manor", count: 1 },
            { label: "Sunset Suites", count: 1 },
            { label: "Skyline Hotel", count: 1 },
        ],
    },];

    // Struct: { rating: ["9+", "8+"], stars: ["5 stars"] }
    const [selectedFilters, setSelectedFilters] = useState({});


    const [price, setPrice] = useState(76);



    const handleCheckboxChange = (sectionId, value) => {
        setSelectedFilters((prev) => {
            const currentSectionValues = prev[sectionId] || [];

            // Если значение уже есть — удаляем, если нет — добавляем
            const nextValues = currentSectionValues.includes(value)
                ? currentSectionValues.filter((v) => v !== value)
                : [...currentSectionValues, value];

            return {
                ...prev,
                [sectionId]: nextValues,
            };
        });
        //console.log(selectedFilters);
    };


    return (<div
            className="flex flex-col border border-gray w-68 text-[#717171] bg-white rounded-lg gap-0 divide-y divide-gray">
            {/* Price */}
            <div className="flex flex-col gap-3 p-6">
                <h3 className="text-[16px] font-bold text-[#555555]">Price</h3>
                <div className="flex flex-row justify-between text-[16px]">
                    <span>{price}$ night</span>
                    <span>100$ night</span>
                </div>
                <div className="relative w-[222.53875732421875px] h-6">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#B3B3B3]"/>
                    <input
                        type="range"
                        min={76}
                        max={100}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="
                            absolute
                            inset-x-0
                            -translate-y-1/3
                            appearance-none
                            h-6
                            bg-transparent
                            cursor-pointer
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

            {/* Search by landmarks */}
        <div className="relative px-6 py-6">
            <input
                type="text"
                placeholder="Attractions near..."
                className="
                  w-56 h-10
                  pr-9
                  pl-4
                  border border-gray
                  rounded-[30px]
                  text-sm
                "
            />

            <span className="absolute right-9 top-1/2 -translate-y-1/2">
                <img src={loupeIcon} alt="loupe" className="w-6 h-6" />
            </span>
        </div>

            {/* Basic filters from the array */}
            {filtersData.map((section) => (<div key={section.id} className="w-full flex flex-col gap-4 px-6 py-6">
                    <h4 className="font-bold ">{section.title}</h4>

                    <ul className="flex flex-col gap-3.25 ">
                        {section.options.map((option) => (
                            <li className="flex flex-row justify-between w-56" key={option.label}>
                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        checked={(selectedFilters[section.id] || []).includes(option.label)}
                                        onChange={() => handleCheckboxChange(section.id, option.label)}
                                        className="appearance-none w-4 h-4 border border-[#B3B3B3] rounded-full checked:bg-[#581ADB]"
                                    />

                                    <span className="text-[16px]">{option.label}</span>
                                </label>
                                <span>{option.count}</span>
                            </li>))}
                    </ul>

                    {section.hasMore && (<button type="button">
                            <img src={chevronDownIcon} alt="chevron down"/>
                        </button>)}
                </div>))}
        </div>);
}

export default Filter;