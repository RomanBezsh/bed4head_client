// Rooms table component
export default function RoomsTable({ rooms }) {
    return (
        <div className="overflow-x-auto rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
                <h2 className="text-[22px] font-bold text-[#1A1A1A]">Rooms list</h2>
                <p className="text-[14px] text-[#8A8A8A]">Added rooms are displayed here</p>
            </div>

            <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-left text-[14px] text-[#8A8A8A]">
                        <th>ID</th>
                        <th>Hotel</th>
                        <th>Room type</th>
                        <th>Capacity</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id} className="bg-[#FAFBFC]">
                            <td className="py-4">{room.id}</td>
                            <td>{room.hotelName}</td>
                            <td>{room.roomType}</td>
                            <td>{room.capacity}</td>
                            <td>{room.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}