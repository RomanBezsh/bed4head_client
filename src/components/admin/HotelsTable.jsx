import { HotelService } from "../../api/hotelApi";
import { Link } from "react-router-dom";

// Hotels table component
export default function HotelsTable({ hotels, onHotelDeleted }) {
    const hotelService = new HotelService();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hotel?")) {
            try {
                await hotelService.deleteHotel(id);
                if (onHotelDeleted) onHotelDeleted(id);
            } catch (error) {
                console.error("Error deleting hotel:", error);
                alert("Failed to delete hotel");
            }
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
                <h2 className="text-[22px] font-bold text-[#1A1A1A]">Hotels list</h2>
                <p className="text-[14px] text-[#8A8A8A]">Added hotels are displayed here</p>
            </div>

            {/* Контейнер с прокруткой по вертикали и горизонтали */}
            <div className="overflow-auto max-h-[600px] custom-scrollbar">
                <table className="w-full min-w-[1100px] border-separate border-spacing-y-3">
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr className="text-left text-[14px] text-[#8A8A8A]">
                            <th className="px-4 bg-white pb-2">ID</th>
                            <th className="px-4 bg-white pb-2">Name</th>
                            <th className="px-4 bg-white pb-2">Stars</th>
                            <th className="px-4 bg-white pb-2">Type</th>
                            <th className="px-4 bg-white pb-2">City</th>
                            <th className="px-4 bg-white pb-2">Address</th>
                            <th className="px-4 bg-white pb-2">Phone</th>
                            <th className="px-4 bg-white pb-2">Status</th>
                            <th className="px-4 bg-white pb-2 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {hotels && hotels.length > 0 ? (
                            hotels.map((hotel) => (
                                <tr key={hotel.id} className="bg-[#FAFBFC]">
                                    <td className="py-4 px-4 text-[#8A8A8A] text-[13px]">{hotel.id}</td>
                                    <td className="px-4 font-semibold text-[#1A1A1A]">
                                        <Link to={`/hotel/${hotel.id}`} className="hover:text-[#581ADB] hover:underline transition-all">
                                            {hotel.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 text-yellow-500">{"★".repeat(Number(hotel.stars) || 0)}</td>
                                    <td className="px-4 text-[14px]">{hotel.type}</td>
                                    <td className="px-4 text-[14px]">{hotel.city}</td>
                                    <td className="px-4 text-[13px] text-[#717171]">{hotel.address}</td>
                                    <td className="px-4 text-[14px] whitespace-nowrap">{hotel.phone}</td>
                                    <td className="px-4">
                                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${hotel.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {hotel.status}
                                        </span>
                                    </td>
                                    <td className="px-4 text-right">
                                        <Link 
                                            to={`/hotel/${hotel.id}`} 
                                            className="mr-4 text-[#1E66F5] hover:text-[#581ADB] font-semibold"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(hotel.id)}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-10 text-center text-[#8A8A8A]">No hotels found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}