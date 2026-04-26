import { useState } from "react";
import FormInput from "./FormInput.jsx";

// Add room form component
export default function AddRoomForm({ hotels, onAddRoom }) {
    const [hotelName, setHotelName] = useState(hotels[0]?.name || "");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [beds, setBeds] = useState("");
    const [capacity, setCapacity] = useState("");
    const [wifi, setWifi] = useState(false);
    const [bathroom, setBathroom] = useState(false);
    const [pool, setPool] = useState(false);
    const [freeCancellation, setFreeCancellation] = useState(false);

    // Handle room form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!hotelName.trim() || !name.trim() || !capacity.trim()) {
            return;
        }

        onAddRoom({
            hotelName,
            name,
            photo,
            beds,
            capacity: Number(capacity),
            amenities: { wifi, bathroom, pool },
            freeCancellation,
        });

        setName("");
        setPhoto(null);
        setBeds("");
        setCapacity("");
        setWifi(false);
        setBathroom(false);
        setPool(false);
        setFreeCancellation(false);
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
                    label="Room name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Luxury Suite"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Room Photo</label>
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="flex h-[48px] w-full items-center rounded-[16px] border border-[#D9D9D9] px-4 py-2 text-[14px] outline-none"
                        accept="image/*"
                    />
                </div>

                <FormInput
                    label="Beds"
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    placeholder="e.g. queen-sized bed 1 | double bed 1"
                />

                <FormInput
                    label="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Enter capacity"
                    type="number"
                />

                <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Room Features</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center gap-2 text-[14px]">
                            <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} />
                            Free WiFi
                        </label>
                        <label className="flex items-center gap-2 text-[14px]">
                            <input type="checkbox" checked={bathroom} onChange={(e) => setBathroom(e.target.checked)} />
                            Bathroom
                        </label>
                        <label className="flex items-center gap-2 text-[14px]">
                            <input type="checkbox" checked={pool} onChange={(e) => setPool(e.target.checked)} />
                            Private Pool
                        </label>
                        <label className="flex items-center gap-2 text-[14px]">
                            <input type="checkbox" checked={freeCancellation} onChange={(e) => setFreeCancellation(e.target.checked)} />
                            Free Cancellation
                        </label>
                    </div>
                </div>

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