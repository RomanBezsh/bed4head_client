import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import searchButton from "../../assets/icons/common/searchnormal.svg";
import profile2Users from "../../assets/icons/common/profile2user.svg";
import plainIcon from "../../assets/icons/common/plain_icon.svg";
import calendar from "../../assets/icons/common/calendar.svg";
import arrowsIcon from "../../assets/icons/common/arrows_icon.svg";

const today = new Date().toISOString().slice(0, 10);

const readSearchParams = (search) => {
    const params = new URLSearchParams(search);

    return {
        country: params.get("country") || "",
        city: params.get("city") || params.get("location") || "",
        checkIn: params.get("from") || "",
        checkOut: params.get("to") || "",
        adults: Math.max(Number(params.get("adults")) || 2, 1),
        children: Math.max(Number(params.get("children")) || 0, 0),
        rooms: Math.max(Number(params.get("rooms")) || 1, 1),
    };
};

const NumberInput = ({ label, value, min = 0, onChange }) => (
    <label className="flex flex-col gap-1">
        <span className="text-[13px] font-semibold text-[#717171]">{label}</span>
        <input
            type="number"
            min={min}
            value={value}
            onChange={(event) => onChange(Math.max(min, Number(event.target.value) || min))}
            className="h-11 rounded-[12px] border border-[#DDDDDD] px-3 text-[15px] font-semibold outline-none focus:border-[#581ADB]"
        />
    </label>
);

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const wrapperRef = useRef(null);
    const initialSearchData = useMemo(() => readSearchParams(location.search), [location.search]);
    const [searchData, setSearchData] = useState(initialSearchData);
    const [activePanel, setActivePanel] = useState(null);

    useEffect(() => {
        setSearchData(initialSearchData);
    }, [initialSearchData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!wrapperRef.current?.contains(event.target)) {
                setActivePanel(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const totalGuests = searchData.adults + searchData.children;
    const destinationLabel = [searchData.city, searchData.country].filter(Boolean).join(", ") || "Where are you going?";
    const datesLabel = searchData.checkIn && searchData.checkOut
        ? `${searchData.checkIn} - ${searchData.checkOut}`
        : "Check in - Check out";
    const guestsLabel = `${searchData.adults} adults · ${searchData.children} children · ${searchData.rooms} room${searchData.rooms === 1 ? "" : "s"}`;

    const updateField = (field, value) => {
        setSearchData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "checkIn" && prev.checkOut && value > prev.checkOut ? { checkOut: value } : {}),
        }));
    };

    const handleSearch = (event) => {
        event?.preventDefault();
        setActivePanel(null);

        const params = new URLSearchParams();
        if (searchData.country.trim()) params.set("country", searchData.country.trim());
        if (searchData.city.trim()) params.set("city", searchData.city.trim());
        if (searchData.checkIn) params.set("from", searchData.checkIn);
        if (searchData.checkOut) params.set("to", searchData.checkOut);
        params.set("adults", String(searchData.adults));
        params.set("children", String(searchData.children));
        params.set("rooms", String(searchData.rooms));
        params.set("guests", String(totalGuests));

        navigate(`/catalog?${params.toString()}`);
    };

    return (
        <form
            ref={wrapperRef}
            onSubmit={handleSearch}
            className="fade-up relative z-50 -mt-[22px] flex justify-center px-3 sm:-mt-[28px] sm:px-4 lg:-mt-[32px]"
        >
            <div className="relative h-auto w-full max-w-[1104px] lg:h-[64px]">
                <div
                    className="
                        flex w-full flex-col rounded-[28px] border border-gray bg-white p-2
                        shadow-[0px_4px_69px_rgba(0,0,0,0.05),0px_1px_8px_rgba(0,0,0,0.08)]
                        transition-all duration-300 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.10)]
                        lg:h-full lg:flex-row lg:items-center lg:rounded-[60px] lg:pl-[34px] lg:pr-[72px]
                    "
                >
                    <button
                        type="button"
                        onClick={() => setActivePanel(activePanel === "destination" ? null : "destination")}
                        className="flex min-w-0 flex-1 items-center gap-[12px] rounded-[22px] px-3 py-3 text-left transition-colors hover:bg-[#F7F4FF] lg:rounded-none lg:px-0 lg:py-0"
                    >
                        <img src={plainIcon} className="h-[22px] w-[22px] shrink-0" alt="" />
                        <span className={`min-w-0 flex-1 truncate text-[14px] ${destinationLabel === "Where are you going?" ? "text-[#222222]" : "font-semibold text-[#222222]"}`}>
                            {destinationLabel}
                        </span>
                    </button>

                    <div className="mx-[30px] hidden h-[39px] w-[1px] bg-[#DDDDDD] lg:block" />

                    <button
                        type="button"
                        onClick={() => setActivePanel(activePanel === "dates" ? null : "dates")}
                        className="flex min-w-0 flex-1 items-center gap-[12px] rounded-[22px] px-3 py-3 text-left transition-colors hover:bg-[#F7F4FF] lg:max-w-[250px] lg:rounded-none lg:px-0 lg:py-0"
                    >
                        <img src={calendar} className="h-[22px] w-[22px] shrink-0" alt="" />
                        <span className={`min-w-0 flex-1 truncate text-[14px] ${datesLabel === "Check in - Check out" ? "text-[#222222]" : "font-semibold text-[#222222]"}`}>
                            {datesLabel}
                        </span>
                    </button>

                    <div className="mx-[30px] hidden h-[39px] w-[1px] bg-[#DDDDDD] lg:block" />

                    <button
                        type="button"
                        onClick={() => setActivePanel(activePanel === "guests" ? null : "guests")}
                        className="flex min-w-0 flex-1 items-center gap-[12px] rounded-[22px] px-3 py-3 text-left transition-colors hover:bg-[#F7F4FF] lg:rounded-none lg:px-0 lg:py-0"
                    >
                        <img src={profile2Users} className="h-[22px] w-[22px] shrink-0" alt="" />
                        <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-[#222222]">
                            {guestsLabel}
                        </span>
                        <img src={arrowsIcon} className={`h-[18px] w-[18px] shrink-0 transition-transform ${activePanel === "guests" ? "rotate-180" : ""}`} alt="" />
                    </button>
                </div>

                <button
                    type="submit"
                    className="
                        mt-2 flex h-[48px] w-full items-center justify-center rounded-full bg-[#581ADB]
                        transition-all duration-200 hover:scale-[1.01] hover:bg-[#6A2BFF] active:scale-95
                        lg:absolute lg:right-[6px] lg:top-1/2 lg:mt-0 lg:h-[52px] lg:w-[52px] lg:-translate-y-1/2
                    "
                    aria-label="Search"
                >
                    <img src={searchButton} className="h-[28px] w-[28px]" alt="" />
                </button>

                {activePanel === "destination" && (
                    <div className="absolute left-0 top-[calc(100%+10px)] z-50 grid w-full gap-3 rounded-[22px] border border-[#DDDDDD] bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.14)] sm:w-[420px] sm:grid-cols-2">
                        <label className="flex flex-col gap-1">
                            <span className="text-[13px] font-semibold text-[#717171]">Country</span>
                            <input
                                type="text"
                                value={searchData.country}
                                onChange={(event) => updateField("country", event.target.value)}
                                placeholder="Ukraine"
                                className="h-11 rounded-[12px] border border-[#DDDDDD] px-3 text-[15px] outline-none focus:border-[#581ADB]"
                                autoFocus
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="text-[13px] font-semibold text-[#717171]">City</span>
                            <input
                                type="text"
                                value={searchData.city}
                                onChange={(event) => updateField("city", event.target.value)}
                                placeholder="Odesa"
                                className="h-11 rounded-[12px] border border-[#DDDDDD] px-3 text-[15px] outline-none focus:border-[#581ADB]"
                            />
                        </label>
                    </div>
                )}

                {activePanel === "dates" && (
                    <div className="absolute left-0 top-[calc(100%+10px)] z-50 grid w-full gap-3 rounded-[22px] border border-[#DDDDDD] bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.14)] sm:left-[250px] sm:w-[430px] sm:grid-cols-2 lg:left-[360px]">
                        <label className="flex flex-col gap-1">
                            <span className="text-[13px] font-semibold text-[#717171]">Check in</span>
                            <input
                                type="date"
                                min={today}
                                value={searchData.checkIn}
                                onChange={(event) => updateField("checkIn", event.target.value)}
                                className="h-11 rounded-[12px] border border-[#DDDDDD] px-3 text-[15px] outline-none focus:border-[#581ADB]"
                                autoFocus
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="text-[13px] font-semibold text-[#717171]">Check out</span>
                            <input
                                type="date"
                                min={searchData.checkIn || today}
                                value={searchData.checkOut}
                                onChange={(event) => updateField("checkOut", event.target.value)}
                                className="h-11 rounded-[12px] border border-[#DDDDDD] px-3 text-[15px] outline-none focus:border-[#581ADB]"
                            />
                        </label>
                    </div>
                )}

                {activePanel === "guests" && (
                    <div className="absolute right-0 top-[calc(100%+10px)] z-50 grid w-full gap-3 rounded-[22px] border border-[#DDDDDD] bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.14)] sm:w-[380px] sm:grid-cols-3">
                        <NumberInput
                            label="Adults"
                            value={searchData.adults}
                            min={1}
                            onChange={(value) => updateField("adults", value)}
                        />
                        <NumberInput
                            label="Children"
                            value={searchData.children}
                            min={0}
                            onChange={(value) => updateField("children", value)}
                        />
                        <NumberInput
                            label="Rooms"
                            value={searchData.rooms}
                            min={1}
                            onChange={(value) => updateField("rooms", value)}
                        />
                    </div>
                )}
            </div>
        </form>
    );
};

export default Search;
