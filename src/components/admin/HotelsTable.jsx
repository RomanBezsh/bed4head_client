// Hotels table component
export default function HotelsTable({ hotels }) {
    return (
        <div className="overflow-x-auto rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
                <h2 className="text-[22px] font-bold text-[#1A1A1A]">Hotels list</h2>
                <p className="text-[14px] text-[#8A8A8A]">Added hotels are displayed here</p>
            </div>

            <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-left text-[14px] text-[#8A8A8A]">
                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {hotels.map((hotel) => (
                        <tr key={hotel.id} className="bg-[#FAFBFC]">
                            <td className="py-4">{hotel.id}</td>
                            <td>{hotel.name}</td>
                            <td>{hotel.city}</td>
                            <td>{hotel.price}</td>
                            <td>{hotel.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}