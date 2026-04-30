import { RoomService } from "../../api/roomApi";

export default function RoomsTable({ rooms = [], hotels = [], onRoomDeleted, onRoomEdit }) {
    const roomService = new RoomService();

    const getHotelName = (room) => {
        if (room.hotelName) return room.hotelName;
        const hotel = hotels.find((item) => String(item.id) === String(room.hotelId));
        return hotel?.name || `Hotel #${room.hotelId || "-"}`;
    };

    const getRoomTitle = (room) => room.title || room.roomType || room.name || "Untitled room";
    const getRoomCapacity = (room) => room.maxGuests || room.capacity || "-";

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this room?")) return;

        try {
            await roomService.deleteRoom(id);
            onRoomDeleted?.(id);
        } catch (error) {
            console.error("Error deleting room:", error);
            alert("Failed to delete room");
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
                <h2 className="text-[22px] font-bold text-[#1A1A1A]">Rooms list</h2>
                <p className="text-[14px] text-[#8A8A8A]">Rooms from the database</p>
            </div>

            <div className="max-h-[600px] overflow-auto custom-scrollbar">
                <table className="w-full min-w-[850px] border-separate border-spacing-y-3">
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr className="text-left text-[14px] text-[#8A8A8A]">
                            <th className="bg-white px-4 pb-2">ID</th>
                            <th className="bg-white px-4 pb-2">Hotel</th>
                            <th className="bg-white px-4 pb-2">Room type</th>
                            <th className="bg-white px-4 pb-2">Capacity</th>
                            <th className="bg-white px-4 pb-2">Price</th>
                            <th className="bg-white px-4 pb-2 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <tr key={room.id} className="bg-[#FAFBFC]">
                                    <td className="px-4 py-4 text-[13px] text-[#8A8A8A]">{room.id}</td>
                                    <td className="px-4 text-[14px]">{getHotelName(room)}</td>
                                    <td className="px-4 font-semibold text-[#1A1A1A]">{getRoomTitle(room)}</td>
                                    <td className="px-4 text-[14px]">{getRoomCapacity(room)}</td>
                                    <td className="px-4 text-[14px]">
                                        {room.price ?? "-"} {room.currencyCode || ""}
                                    </td>
                                    <td className="px-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onRoomEdit?.(room)}
                                            className="mr-4 font-semibold text-[#1E66F5] hover:text-[#581ADB]"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(room.id)}
                                            className="font-semibold text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-[#8A8A8A]">
                                    No rooms found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
