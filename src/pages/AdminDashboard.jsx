import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../components/admin/SidebarButton.jsx";
import StatCard from "../components/admin/StatCard.jsx";
import HotelsTable from "../components/admin/HotelsTable.jsx";
import RoomsTable from "../components/admin/RoomsTable.jsx";
import UsersTable from "../components/admin/UsersTable.jsx";
import AddHotelForm from "../components/admin/AddHotelForm.jsx";
import AddRoomForm from "../components/admin/AddRoomForm.jsx";
import ChartsSection from "../components/admin/charts/ChartsSection.jsx";
import { HotelService } from "../api/hotelApi.js";
import { RoomService } from "../api/roomApi.js";
import { UserService } from "../api/userApi.js";

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingHotel, setEditingHotel] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const hotelService = useMemo(() => new HotelService(), []);
    const roomService = useMemo(() => new RoomService(), []);
    const userService = useMemo(() => new UserService(), []);

    const loadAdminData = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const [hotelsResult, usersResult] = await Promise.allSettled([
                hotelService.getAllHotels(),
                userService.getAllUsers(),
            ]);

            if (hotelsResult.status === "rejected") {
                throw hotelsResult.reason;
            }

            if (usersResult.status === "rejected") {
                console.warn("Users endpoint is unavailable:", usersResult.reason);
            }

            const hotelsData = hotelsResult.value;
            const roomsResult = await Promise.allSettled(
                (Array.isArray(hotelsData) ? hotelsData : []).map((hotel) =>
                    roomService.getRoomsByHotelId(hotel.id)
                )
            );
            const roomsData = roomsResult.flatMap((result) =>
                result.status === "fulfilled" && Array.isArray(result.value) ? result.value : []
            );
            const usersData = usersResult.status === "fulfilled" ? usersResult.value : [];

            setHotels(Array.isArray(hotelsData) ? hotelsData : []);
            setRooms(Array.isArray(roomsData) ? roomsData : []);
            setUsers(Array.isArray(usersData) ? usersData : []);
        } catch (err) {
            console.error("Error loading admin data:", err);
            setError("Failed to load admin data from database.");
        } finally {
            setLoading(false);
        }
    }, [hotelService, roomService, userService]);

    useEffect(() => {
        loadAdminData();
    }, [loadAdminData]);

    const handleAddHotel = () => {
        setEditingHotel(null);
        loadAdminData();
        setActiveSection("Dashboard");
    };

    const handleAddRoom = () => {
        setEditingRoom(null);
        loadAdminData();
        setActiveSection("Dashboard");
    };

    const handleHotelDeleted = (id) => {
        setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
        setRooms((prev) => prev.filter((room) => room.hotelId !== id));
    };

    const handleHotelUpdated = (updatedHotel) => {
        setHotels((prev) =>
            prev.map((hotel) => (hotel.id === updatedHotel.id ? { ...hotel, ...updatedHotel } : hotel))
        );
    };

    const handleEditHotel = async (hotel) => {
        try {
            const fullHotel = await hotelService.getFullHotelById(hotel.id);
            setEditingHotel({ ...hotel, ...fullHotel, id: hotel.id });
            setActiveSection("Add Hotel");
        } catch (err) {
            console.error("Error loading full hotel:", err);
            alert("Failed to load full hotel data");
        }
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setActiveSection("Add Room");
    };

    const handleRoomDeleted = (id) => {
        setRooms((prev) => prev.filter((room) => room.id !== id));
    };

    const handleRoomUpdated = (updatedRoom) => {
        setRooms((prev) =>
            prev.map((room) => (room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room))
        );
    };

    const stats = [
        { title: "Hotels", value: hotels.length },
        { title: "Rooms", value: rooms.length },
        { title: "Users", value: users.length },
        { title: "Cities", value: new Set(hotels.map((hotel) => hotel.city).filter(Boolean)).size },
    ];

    const renderContent = () => {
        if (loading) {
            return (
                <div className="rounded-[24px] bg-white p-8 text-[#717171] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    Loading admin data...
                </div>
            );
        }

        if (error) {
            return (
                <div className="rounded-[24px] bg-white p-8 text-red-500 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    {error}
                </div>
            );
        }

        if (activeSection === "Add Hotel") {
            return (
                <div className="space-y-6">
                    <AddHotelForm
                        onAddHotel={handleAddHotel}
                        editingHotel={editingHotel}
                        onCancelEdit={() => setEditingHotel(null)}
                    />
                    <HotelsTable
                        hotels={hotels}
                        onHotelDeleted={handleHotelDeleted}
                        onHotelUpdated={handleHotelUpdated}
                        onHotelEdit={handleEditHotel}
                    />
                </div>
            );
        }

        if (activeSection === "Add Room") {
            return (
                <div className="space-y-6">
                    <AddRoomForm
                        onAddRoom={handleAddRoom}
                        editingRoom={editingRoom}
                        onCancelEdit={() => setEditingRoom(null)}
                    />
                    <RoomsTable
                        rooms={rooms}
                        hotels={hotels}
                        onRoomDeleted={handleRoomDeleted}
                        onRoomUpdated={handleRoomUpdated}
                        onRoomEdit={handleEditRoom}
                    />
                </div>
            );
        }

        if (activeSection === "Users") {
            return <UsersTable users={users} />;
        }

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <StatCard key={item.title} title={item.title} value={item.value} />
                    ))}
                </div>

                <ChartsSection />

                <HotelsTable
                    hotels={hotels}
                    onHotelDeleted={handleHotelDeleted}
                    onHotelUpdated={handleHotelUpdated}
                    onHotelEdit={handleEditHotel}
                />
                <RoomsTable
                    rooms={rooms}
                    hotels={hotels}
                    onRoomDeleted={handleRoomDeleted}
                    onRoomUpdated={handleRoomUpdated}
                    onRoomEdit={handleEditRoom}
                />
                <UsersTable users={users} />
            </div>
        );
    };

    const navigationItems = ["Dashboard", "Add Hotel", "Add Room", "Users"];

    return (
        <div className="min-h-screen bg-[#F5F7FB]">
            <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
                <aside className="hidden w-[260px] shrink-0 rounded-[28px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:block">
                    <h2 className="mb-6 text-[24px] font-bold text-[#1A1A1A]">
                        Admin Panel
                    </h2>

                    <div className="space-y-2">
                        {navigationItems.map((item) => (
                            <SidebarButton
                                key={item}
                                label={item}
                                active={activeSection === item}
                                onClick={() => {
                                    if (item !== "Add Hotel") setEditingHotel(null);
                                    if (item !== "Add Room") setEditingRoom(null);
                                    setActiveSection(item);
                                }}
                            />
                        ))}
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[28px] font-bold text-[#1A1A1A]">
                                {activeSection}
                            </h1>
                            <p className="text-[14px] text-[#8A8A8A]">
                                Manage hotels, rooms and users from the database
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={loadAdminData}
                                className="h-[46px] rounded-full bg-[#1E66F5] px-5 font-semibold text-white"
                            >
                                Refresh
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="h-[46px] rounded-full bg-[#EEF3F8] px-5 font-semibold text-[#2F2F2F]"
                            >
                                Main page
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 flex gap-2 overflow-x-auto rounded-[20px] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:hidden">
                        {navigationItems.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => {
                                    if (item !== "Add Hotel") setEditingHotel(null);
                                    if (item !== "Add Room") setEditingRoom(null);
                                    setActiveSection(item);
                                }}
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

                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
