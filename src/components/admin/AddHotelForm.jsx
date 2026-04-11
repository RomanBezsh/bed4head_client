import { useState } from "react";
import FormInput from "./FormInput.jsx";

// Add hotel form component
export default function AddHotelForm({ onAddHotel }) {
    const [hotelName, setHotelName] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Active");

    // Handle hotel form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!hotelName.trim() || !city.trim() || !price.trim()) {
            return;
        }

        onAddHotel({
            name: hotelName,
            city,
            price: `$${price}`,
            status,
        });

        setHotelName("");
        setCity("");
        setPrice("");
        setStatus("Active");
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold text-[#1A1A1A]">Add hotel</h2>
                <p className="text-[14px] text-[#8A8A8A]">
                    Fill in the hotel information and add it to the system
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                    label="Hotel name"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="Enter hotel name"
                />

                <FormInput
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />

                <FormInput
                    label="Price per night"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    type="number"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="h-[50px] rounded-full bg-[#1E66F5] px-6 text-white"
                    >
                        Add hotel
                    </button>
                </div>
            </form>
        </div>
    );
}