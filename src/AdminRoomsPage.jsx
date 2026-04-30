import React, { useEffect, useState, useMemo } from 'react';
import { RoomService } from './api/roomApi';
import { Link } from 'react-router-dom';

const AdminRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const roomService = useMemo(() => new RoomService(), []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                // Предполагается, что RoomService будет иметь метод getAllRooms()
                // Если нет, то нужно будет его добавить или получать комнаты через отели
                const data = await roomService.getAllRooms(); // Этот метод нужно будет добавить
                setRooms(data);
            } catch (err) {
                setError("Failed to fetch rooms.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, [roomService]);

    if (loading) return <div className="p-6">Loading rooms...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Rooms</h2>
            <Link to="/admin/rooms/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add New Room</Link>
            {rooms.length === 0 && (
                <p className="text-[#717171]">No rooms available yet.</p>
            )}
            {/* Здесь будет таблица комнат */}
            {rooms.length > 0 && (
            <ul className="list-disc pl-5">
                {rooms.map(room => (
                    <li key={room.id} className="mb-2">
                        <Link to={`/admin/rooms/${room.id}`} className="text-blue-600 hover:underline">
                            {room.title} (Hotel ID: {room.hotelId})
                        </Link>
                        {/* Кнопки для редактирования/удаления */}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default AdminRoomsPage;
