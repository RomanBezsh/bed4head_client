import { useEffect, useMemo, useState } from "react";
import FormInput from "./FormInput.jsx";
import { HotelService } from "../../api/hotelApi";
import { RoomService } from "../../api/roomApi";

export default function AddRoomForm({ onAddRoom, editingRoom, onCancelEdit }) {
    const hotelService = useMemo(() => new HotelService(), []);
    const roomService = useMemo(() => new RoomService(), []);
    const isEditing = Boolean(editingRoom?.id);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [currencyCode, setCurrencyCode] = useState("USD");
    const [maxGuests, setMaxGuests] = useState(1);
    const [selectedHotelId, setSelectedHotelId] = useState("");
    const [freeCancellation, setFreeCancellation] = useState(true);
    const [privateBathroom, setPrivateBathroom] = useState(true);
    const [hasWifi, setHasWifi] = useState(true);
    const [hasPrivatePool, setHasPrivatePool] = useState(false);
    const [beds, setBeds] = useState([{ type: "Single bed", count: 1 }]);
    const [previewImageFile, setPreviewImageFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [loadingHotels, setLoadingHotels] = useState(true);
    const [errorHotels, setErrorHotels] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoadingHotels(true);
                const data = await hotelService.getAllHotels();
                setHotels(Array.isArray(data) ? data : []);
                if (!selectedHotelId && data?.length > 0) {
                    setSelectedHotelId(data[0].id);
                }
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setErrorHotels("Failed to load hotels.");
            } finally {
                setLoadingHotels(false);
            }
        };

        fetchHotels();
    }, [hotelService, selectedHotelId]);

    useEffect(() => {
        if (!editingRoom) return;

        setTitle(editingRoom.title || editingRoom.roomType || "");
        setPrice(editingRoom.price || "");
        setCurrencyCode(editingRoom.currencyCode || "USD");
        setMaxGuests(editingRoom.maxGuests || editingRoom.capacity || 1);
        setSelectedHotelId(editingRoom.hotelId || "");
        setFreeCancellation(editingRoom.freeCancellation ?? true);
        setPrivateBathroom(editingRoom.privateBathroom ?? true);
        setHasWifi(editingRoom.hasWifi ?? true);
        setHasPrivatePool(editingRoom.hasPrivatePool ?? false);
        setBeds(Array.isArray(editingRoom.beds) && editingRoom.beds.length > 0
            ? editingRoom.beds
            : [{ type: "Single bed", count: 1 }]);
        setPreviewImageUrl(editingRoom.previewImage || null);
        setPreviewImageFile(null);
    }, [editingRoom]);

    const handleAddBed = () => setBeds((prev) => [...prev, { type: "Single bed", count: 1 }]);
    const handleRemoveBed = (index) => setBeds((prev) => prev.filter((_, i) => i !== index));
    const handleUpdateBed = (index, field, value) => {
        setBeds((prev) => prev.map((bed, i) => (
            i === index ? { ...bed, [field]: field === "count" ? Number(value) : value } : bed
        )));
    };

    const resetForm = () => {
        setTitle("");
        setPrice("");
        setCurrencyCode("USD");
        setMaxGuests(1);
        setFreeCancellation(true);
        setPrivateBathroom(true);
        setHasWifi(true);
        setHasPrivatePool(false);
        setBeds([{ type: "Single bed", count: 1 }]);
        setPreviewImageFile(null);
        setPreviewImageUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedHotel = hotels.find((hotel) => String(hotel.id) === String(selectedHotelId));
        if (!selectedHotel) {
            alert("Select a hotel");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("currencyCode", currencyCode);
        formData.append("maxGuests", maxGuests);
        formData.append("hotelId", selectedHotelId);
        formData.append("freeCancellation", freeCancellation);
        formData.append("privateBathroom", privateBathroom);
        formData.append("hasWifi", hasWifi);
        formData.append("hasPrivatePool", hasPrivatePool);
        formData.append("beds", JSON.stringify(beds));

        if (previewImageFile) {
            formData.append("previewImage", previewImageFile);
        }

        try {
            const savedRoom = isEditing
                ? await roomService.updateRoom(editingRoom.id, formData)
                : await roomService.createRoom(formData);

            onAddRoom?.({
                ...editingRoom,
                ...savedRoom,
                id: savedRoom?.id || editingRoom?.id,
                title,
                price,
                currencyCode,
                maxGuests,
                hotelId: selectedHotelId,
                hotelName: selectedHotel.name,
                beds,
                freeCancellation,
                privateBathroom,
                hasWifi,
                hasPrivatePool,
            });

            resetForm();
            alert(isEditing ? "Room updated successfully!" : "Room added successfully!");
        } catch (error) {
            console.error("Error saving room:", error);
            alert("Error saving room: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold text-[#1A1A1A]">{isEditing ? "Edit Room" : "Add Room"}</h2>
                <p className="text-[14px] text-[#8A8A8A]">
                    {isEditing ? "Update all room data" : "Fill in the room information and add it to an existing hotel"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2 md:col-span-2 border-b pb-4">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Select Hotel</label>
                    {loadingHotels && <p>Loading hotels...</p>}
                    {errorHotels && <p className="text-red-500">{errorHotels}</p>}
                    {!loadingHotels && !errorHotels && hotels.length === 0 && (
                        <p className="text-[14px] text-[#717171]">
                            No hotels available yet. Add a hotel before creating rooms.
                        </p>
                    )}
                    {!loadingHotels && hotels.length > 0 && (
                        <select
                            value={selectedHotelId}
                            onChange={(e) => setSelectedHotelId(e.target.value)}
                            className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                            required
                        >
                            {hotels.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.name} ({hotel.city})
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <FormInput label="Room Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <FormInput label="Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" required />
                <FormInput label="Max Guests" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} type="number" min="1" required />

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Currency</label>
                    <select
                        value={currencyCode}
                        onChange={(e) => setCurrencyCode(e.target.value)}
                        className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UAH">UAH</option>
                    </select>
                </div>

                <div className="md:col-span-2 py-4 border-y">
                    <h3 className="mb-3 text-[16px] font-bold text-[#1A1A1A]">Amenities</h3>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        {[
                            ["Free Cancellation", freeCancellation, setFreeCancellation],
                            ["Private Bathroom", privateBathroom, setPrivateBathroom],
                            ["Wi-Fi", hasWifi, setHasWifi],
                            ["Private Pool", hasPrivatePool, setHasPrivatePool],
                        ].map(([label, checked, setter]) => (
                            <label key={label} className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(event) => setter(event.target.checked)}
                                    className="h-4 w-4 accent-[#1E66F5]"
                                />
                                <span className="text-[14px] text-[#4A4A4A]">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-[16px] font-bold text-[#1A1A1A]">Beds</h3>
                        <button type="button" onClick={handleAddBed} className="text-[13px] font-semibold text-[#1E66F5] hover:underline">
                            + Add bed
                        </button>
                    </div>

                    <div className="space-y-3">
                        {beds.map((bed, index) => (
                            <div key={index} className="flex items-end gap-3 rounded-[16px] border border-[#E8EEF9] bg-[#F9FBFF] p-3">
                                <div className="flex-1">
                                    <label className="ml-1 text-[12px] font-semibold text-[#8A8A8A]">Bed Type</label>
                                    <select
                                        value={bed.type}
                                        onChange={(e) => handleUpdateBed(index, "type", e.target.value)}
                                        className="h-[40px] w-full rounded-[12px] border border-[#D9D9D9] px-3 text-[13px] outline-none"
                                    >
                                        <option value="Single bed">Single bed</option>
                                        <option value="Double bed">Double bed</option>
                                        <option value="Queen size bed">Queen size bed</option>
                                        <option value="King size bed">King size bed</option>
                                        <option value="Sofa bed">Sofa bed</option>
                                    </select>
                                </div>
                                <div className="w-24">
                                    <label className="ml-1 text-[12px] font-semibold text-[#8A8A8A]">Count</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={bed.count}
                                        onChange={(e) => handleUpdateBed(index, "count", e.target.value)}
                                        className="h-[40px] w-full rounded-[12px] border border-[#D9D9D9] px-3 text-[13px] outline-none"
                                    />
                                </div>
                                {beds.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveBed(index)} className="h-[40px] rounded-[12px] px-3 text-red-500 hover:bg-red-50">
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 border-t pt-4">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Room Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setPreviewImageFile(file);
                            setPreviewImageUrl(file ? URL.createObjectURL(file) : null);
                        }}
                    />
                    {previewImageUrl && (
                        <div className="mt-2 h-32 w-full overflow-hidden rounded-[16px] border md:w-48">
                            <img src={previewImageUrl} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="h-[50px] rounded-full bg-[#1E66F5] px-6 text-white" disabled={loadingHotels || hotels.length === 0}>
                        {isEditing ? "Save Room" : "Add Room"}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={onCancelEdit} className="ml-3 h-[50px] rounded-full bg-[#EEF3F8] px-6 text-[#2F2F2F]">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
