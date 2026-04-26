import { useState } from "react";
import FormInput from "./FormInput.jsx";

// Add hotel form component
export default function AddHotelForm({ onAddHotel }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState("5");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [photos, setPhotos] = useState([]);
    const [facilities, setFacilities] = useState("");
    const [importantInfo, setImportantInfo] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [nearbyPlaces, setNearbyPlaces] = useState("");
    const [status, setStatus] = useState("Active");

    // Handle hotel form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !city.trim() || !address.trim()) {
            return;
        }

        onAddHotel({
            name,
            description,
            stars: Number(stars),
            address,
            city,
            country,
            photos,
            facilities,
            importantInfo,
            coordinates,
            nearbyPlaces,
            status,
        });

        setName("");
        setDescription("");
        setStars("5");
        setAddress("");
        setCity("");
        setCountry("");
        setPhotos([]);
        setFacilities("");
        setImportantInfo("");
        setCoordinates("");
        setNearbyPlaces("");
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter hotel name"
                />

                <FormInput
                    label="Stars (1-5)"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder="5"
                    type="number"
                />

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter hotel description"
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="3"
                    />
                </div>

                <FormInput
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address"
                />

                <FormInput
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />

                <FormInput
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Hotel Photos</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setPhotos(Array.from(e.target.files))}
                        className="flex h-[48px] w-full items-center rounded-[16px] border border-[#D9D9D9] px-4 py-2 text-[14px] outline-none"
                        accept="image/*"
                    />
                </div>

                <FormInput
                    label="Geo Coordinates (lat, lng)"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                    placeholder="e.g. 50.4501, 30.5234"
                />

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Facilities (Amenities)</label>
                    <textarea
                        value={facilities}
                        onChange={(e) => setFacilities(e.target.value)}
                        placeholder="WiFi, Spa, Gym, Parking..."
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Important Information</label>
                    <textarea
                        value={importantInfo}
                        onChange={(e) => setImportantInfo(e.target.value)}
                        placeholder="Check-in policy, rules..."
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">What's nearby (Category, Name, Distance)</label>
                    <textarea
                        value={nearbyPlaces}
                        onChange={(e) => setNearbyPlaces(e.target.value)}
                        placeholder="Restaurant, KFC, 0.5km; Park, Central Park, 1.2km..."
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="2"
                    />
                </div>

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