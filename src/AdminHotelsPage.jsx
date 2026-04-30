import React, { useEffect, useState, useMemo } from 'react';
import { HotelService } from './api/hotelApi';
import { Link } from 'react-router-dom';

const AdminHotelsPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hotelService = useMemo(() => new HotelService(), []);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await hotelService.getAllHotels();
                setHotels(data);
            } catch (err) {
                setError("Failed to fetch hotels.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, [hotelService]);

    if (loading) return <div className="p-6">Loading hotels...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Hotels</h2>
            <Link to="/admin/hotels/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add New Hotel</Link>
            {/* Здесь будет таблица отелей */}
            <ul className="list-disc pl-5">
                {hotels.map(hotel => (
                    <li key={hotel.id} className="mb-2">
                        <Link to={`/admin/hotels/${hotel.id}`} className="text-blue-600 hover:underline">
                            {hotel.name} ({hotel.city})
                        </Link>
                        {/* Кнопки для редактирования/удаления */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminHotelsPage;
