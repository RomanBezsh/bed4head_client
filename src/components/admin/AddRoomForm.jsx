import { useState } from "react";
import FormInput from "./FormInput.jsx";

// Add room form component
export default function AddRoomForm({ hotels, onAddRoom }) {
    const [hotelName, setHotelName] = useState(hotels[0]?.name || "");
    const [roomType, setRoomType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");

    // Handle room form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!hotelName.trim() || !roomType.trim() || !capacity.trim() || !price.trim()) {
            return;
        }

        onAddRoom({
            hotelName,
            roomType,
            capacity: Number(capacity),
            price: `$${price}`,
        });

        setRoomType("");
        setCapacity("");
        setPrice("");
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold text-[#1A1A1A]">Add room</h2>
                <p className="text-[14px] text-[#8A8A8A]">
                    Select a hotel and create a room for it
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Hotel</label>
                    <select
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none"
                    >
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.name}>
                                {hotel.name}
                            </option>
                        ))}
                    </select>
                </div>

                <FormInput
                    label="Room type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    placeholder="Standard, Luxury, Family..."
                />

                <FormInput
                    label="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Enter capacity"
                    type="number"
                />

                <FormInput
                    label="Price per night"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    type="number"
                />

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="h-[50px] rounded-full bg-[#1E66F5] px-6 text-white"
                    >
                        Add room
                    </button>
                </div>
            </form>
        </div>
    );
}