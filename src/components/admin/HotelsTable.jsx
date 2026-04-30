import { HotelService } from "../../api/hotelApi";
import { Link } from "react-router-dom";

export default function HotelsTable({ hotels = [], onHotelDeleted, onHotelEdit }) {
    const hotelService = new HotelService();

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this hotel?")) return;

        try {
            await hotelService.deleteHotel(id);
            onHotelDeleted?.(id);
        } catch (error) {
            console.error("Error deleting hotel:", error);
            alert("Failed to delete hotel");
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
                <h2 className="text-[22px] font-bold text-[#1A1A1A]">Hotels list</h2>
                <p className="text-[14px] text-[#8A8A8A]">Hotels from the database</p>
            </div>

            <div className="max-h-[600px] overflow-auto custom-scrollbar">
                <table className="w-full min-w-[1100px] border-separate border-spacing-y-3">
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr className="text-left text-[14px] text-[#8A8A8A]">
                            <th className="bg-white px-4 pb-2">ID</th>
                            <th className="bg-white px-4 pb-2">Name</th>
                            <th className="bg-white px-4 pb-2">Stars</th>
                            <th className="bg-white px-4 pb-2">Type</th>
                            <th className="bg-white px-4 pb-2">City</th>
                            <th className="bg-white px-4 pb-2">Address</th>
                            <th className="bg-white px-4 pb-2">Phone</th>
                            <th className="bg-white px-4 pb-2">Status</th>
                            <th className="bg-white px-4 pb-2 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {hotels.length > 0 ? (
                            hotels.map((hotel) => (
                                <tr key={hotel.id} className="bg-[#FAFBFC]">
                                    <td className="px-4 py-4 text-[13px] text-[#8A8A8A]">{hotel.id}</td>
                                    <td className="px-4 font-semibold text-[#1A1A1A]">
                                        <Link to={`/hotel/${hotel.id}`} className="transition-all hover:text-[#581ADB] hover:underline">
                                            {hotel.name || "Untitled hotel"}
                                        </Link>
                                    </td>
                                    <td className="px-4 text-[14px]">{hotel.stars ?? "-"}</td>
                                    <td className="px-4 text-[14px]">{hotel.type || "-"}</td>
                                    <td className="px-4 text-[14px]">{hotel.city || "-"}</td>
                                    <td className="px-4 text-[13px] text-[#717171]">{hotel.address || "-"}</td>
                                    <td className="px-4 text-[14px] whitespace-nowrap">{hotel.phone || "-"}</td>
                                    <td className="px-4">
                                        <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${
                                            hotel.status === "Inactive"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                        }`}>
                                            {hotel.status || "Active"}
                                        </span>
                                    </td>
                                    <td className="px-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onHotelEdit?.(hotel)}
                                            className="mr-4 font-semibold text-[#1E66F5] hover:text-[#581ADB]"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(hotel.id)}
                                            className="font-semibold text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-10 text-center text-[#8A8A8A]">
                                    No hotels found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
