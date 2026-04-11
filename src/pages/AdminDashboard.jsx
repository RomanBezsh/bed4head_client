import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../components/admin/SidebarButton.jsx";
import StatCard from "../components/admin/StatCard.jsx";
import HotelsTable from "../components/admin/HotelsTable.jsx";
import RoomsTable from "../components/admin/RoomsTable.jsx";
import AddHotelForm from "../components/admin/AddHotelForm.jsx";
import AddRoomForm from "../components/admin/AddRoomForm.jsx";
import ChartsSection from "../components/admin/charts/ChartsSection.jsx";

// Initial hotels data
const initialHotelsData = [
    {
        id: 1,
        name: "Grand Palace Hotel",
        city: "Odesa",
        price: "$120",
        status: "Active",
    },
    {
        id: 2,
        name: "Sea View Resort",
        city: "Kyiv",
        price: "$150",
        status: "Active",
    },
    {
        id: 3,
        name: "Royal Comfort",
        city: "Lviv",
        price: "$95",
        status: "Active",
    },
];

// Initial rooms data
const initialRoomsData = [
    {
        id: 1,
        hotelName: "Grand Palace Hotel",
        roomType: "Standard",
        capacity: 2,
        price: "$80",
    },
    {
        id: 2,
        hotelName: "Grand Palace Hotel",
        roomType: "Luxury",
        capacity: 4,
        price: "$150",
    },
    {
        id: 3,
        hotelName: "Sea View Resort",
        roomType: "Family",
        capacity: 3,
        price: "$130",
    },
    {
        id: 4,
        hotelName: "Royal Comfort",
        roomType: "Single",
        capacity: 1,
        price: "$60",
    },
];

// Main admin dashboard page
export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [hotels, setHotels] = useState(initialHotelsData);
    const [rooms, setRooms] = useState(initialRoomsData);
    const navigate = useNavigate();

    // Add a new hotel to state
    const handleAddHotel = (newHotel) => {
        const createdHotel = {
            id: hotels.length + 1,
            ...newHotel,
        };

        setHotels((prev) => [...prev, createdHotel]);
        setActiveSection("Dashboard");
    };

    // Add a new room to state
    const handleAddRoom = (newRoom) => {
        const createdRoom = {
            id: rooms.length + 1,
            ...newRoom,
        };

        setRooms((prev) => [...prev, createdRoom]);
        setActiveSection("Dashboard");
    };

    // Build dynamic statistics from current state
    const stats = [
        { title: "Hotels", value: hotels.length },
        { title: "Rooms", value: rooms.length },
        { title: "Cities", value: new Set(hotels.map((hotel) => hotel.city)).size },
        { title: "Room types", value: new Set(rooms.map((room) => room.roomType)).size },
    ];

    // Render page content based on current section
    const renderContent = () => {
        if (activeSection === "Add Hotel") {
            return (
                <div className="space-y-6">
                    <AddHotelForm onAddHotel={handleAddHotel} />
                    <HotelsTable hotels={hotels} />
                </div>
            );
        }

        if (activeSection === "Add Room") {
            return (
                <div className="space-y-6">
                    <AddRoomForm hotels={hotels} onAddRoom={handleAddRoom} />
                    <RoomsTable rooms={rooms} />
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {/* Statistics cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <StatCard
                            key={item.title}
                            title={item.title}
                            value={item.value}
                        />
                    ))}
                </div>

                {/* Charts and diagrams */}
                <ChartsSection />

                {/* Data tables */}
                <HotelsTable hotels={hotels} />
                <RoomsTable rooms={rooms} />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB]">
            <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
                {/* Desktop sidebar */}
                <aside className="hidden w-[260px] shrink-0 rounded-[28px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:block">
                    <h2 className="mb-6 text-[24px] font-bold text-[#1A1A1A]">
                        Admin Panel
                    </h2>

                    <div className="space-y-2">
                        <SidebarButton
                            label="Dashboard"
                            active={activeSection === "Dashboard"}
                            onClick={() => setActiveSection("Dashboard")}
                        />
                        <SidebarButton
                            label="Add Hotel"
                            active={activeSection === "Add Hotel"}
                            onClick={() => setActiveSection("Add Hotel")}
                        />
                        <SidebarButton
                            label="Add Room"
                            active={activeSection === "Add Room"}
                            onClick={() => setActiveSection("Add Room")}
                        />
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1">
                    {/* Top bar */}
                    <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[28px] font-bold text-[#1A1A1A]">
                                {activeSection}
                            </h1>
                            <p className="text-[14px] text-[#8A8A8A]">
                                Manage hotels and rooms from one place
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {/* Return to main page */}
                            <button
                                onClick={() => navigate("/")}
                                className="h-[46px] rounded-full bg-[#EEF3F8] px-5 font-semibold text-[#2F2F2F]"
                            >
                                Main page
                            </button>
                        </div>
                    </div>

                    {/* Mobile navigation */}
                    <div className="mb-4 flex gap-2 overflow-x-auto rounded-[20px] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:hidden">
                        {["Dashboard", "Add Hotel", "Add Room"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveSection(item)}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-[14px] ${
                                    activeSection === item
                                        ? "bg-[#1E66F5] text-white"
                                        : "bg-[#EEF3F8] text-[#2F2F2F]"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic page section */}
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}