export default function UsersTable({ users = [] }) {
    return (
        <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
                <h2 className="text-[22px] font-bold text-[#1A1A1A]">Users list</h2>
                <p className="text-[14px] text-[#8A8A8A]">Users from the database, read only</p>
            </div>

            <div className="max-h-[600px] overflow-auto custom-scrollbar">
                <table className="w-full min-w-[850px] border-separate border-spacing-y-3">
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr className="text-left text-[14px] text-[#8A8A8A]">
                            <th className="bg-white px-4 pb-2">ID</th>
                            <th className="bg-white px-4 pb-2">Email</th>
                            <th className="bg-white px-4 pb-2">Country</th>
                            <th className="bg-white px-4 pb-2">City</th>
                            <th className="bg-white px-4 pb-2">Travel purpose</th>
                            <th className="bg-white px-4 pb-2">Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="bg-[#FAFBFC]">
                                    <td className="px-4 py-4 text-[13px] text-[#8A8A8A]">{user.id}</td>
                                    <td className="px-4 font-semibold text-[#1A1A1A]">{user.email || "-"}</td>
                                    <td className="px-4 text-[14px]">{user.country || "-"}</td>
                                    <td className="px-4 text-[14px]">{user.city || "-"}</td>
                                    <td className="px-4 text-[14px]">{user.travelPurpose || "-"}</td>
                                    <td className="px-4 text-[14px]">{user.role ?? "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-[#8A8A8A]">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
