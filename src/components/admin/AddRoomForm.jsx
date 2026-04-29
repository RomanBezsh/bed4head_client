import { useState, useEffect, useMemo } from "react";
import FormInput from "./FormInput.jsx";
import { HotelService } from "../../api/hotelApi"; // Import HotelService
import { RoomService } from "../../api/roomApi"; // Import RoomService

export default function AddRoomForm({ onAddRoom }) { // Removed 'hotels' prop
    const hotelService = useMemo(() => new HotelService(), []); // Initialize HotelService
    const roomService = useMemo(() => new RoomService(), []); // Initialize RoomService

    // Основная информация
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [currencyCode, setCurrencyCode] = useState("USD");
    const [maxGuests, setMaxGuests] = useState(1);
    const [selectedHotelId, setSelectedHotelId] = useState("");
    // Удобства
    const [freeCancellation, setFreeCancellation] = useState(true);
    const [privateBathroom, setPrivateBathroom] = useState(true);
    const [hasWifi, setHasWifi] = useState(true);
    const [hasPrivatePool, setHasPrivatePool] = useState(false);
    // Кровати
    const [beds, setBeds] = useState([{ type: "Single bed", count: 1 }]);
    // Фото
    const [previewImageFile, setPreviewImageFile] = useState(null); // Для хранения объекта File
    const [previewImageUrl, setPreviewImageUrl] = useState(null); // Для отображения превью

    const [fetchedHotels, setFetchedHotels] = useState([]); // State for fetched hotels
    const [loadingHotels, setLoadingHotels] = useState(true); // Loading state for hotels
    const [errorHotels, setErrorHotels] = useState(null); // Error state for hotels

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoadingHotels(true);
                const data = await hotelService.getAllHotels(); // Fetch all hotels
                setFetchedHotels(data);
                if (data.length > 0 && !selectedHotelId) {
                     setSelectedHotelId(data[0].id);// Автоматически выбираем первый отель
                }
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setErrorHotels("Failed to load hotels.");
            } finally {
                setLoadingHotels(false);
            }
        };
        fetchHotels();
    }, [hotelService]);

    const handleAddBed = () => {
        setBeds([...beds, { type: "Single bed", count: 1 }]);
    };

    const handleRemoveBed = (index) => {
        setBeds(beds.filter((_, i) => i !== index));
    };

    const handleUpdateBed = (index, field, value) => {
        const updatedBeds = [...beds];
        updatedBeds[index][field] = field === "count" ? Number(value) : value;
        setBeds(updatedBeds);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация
        if (!selectedHotelId) {
            alert("Выбери отель");
            return;
        }
        const selectedHotel = fetchedHotels.find(
            hotel => hotel.id.toString() === selectedHotelId.toString()
        );
        if (!selectedHotel) {
            alert("Выбранный отель не найден.");
            return;
        }
        if (Number(price) <= 0) {
            alert("Цена должна быть больше нуля.");
            return;
        }
        if (Number(maxGuests) <= 0) {
            alert("Максимальное количество гостей должно быть больше нуля.");
            return;
        }
        if (beds.some(bed => bed.count <= 0)) {
            alert("Количество кроватей должно быть больше нуля.");
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

        // Кровати (как JSON строка)
        formData.append("beds", JSON.stringify(beds));

        // Фото
        if (previewImageFile) {
            formData.append("previewImage", previewImageFile);
        }

        try {
            const createdRoom = await roomService.createRoom(formData); // Отправка данных на бэкенд

            // Добавляем hotelName, roomType и capacity для отображения в RoomsTable
            const roomWithDisplayInfo = {
                id: createdRoom?.id || Date.now(),
                ...createdRoom,
                hotelName: selectedHotel.name,
                roomType: title, // Используем локальный стейт, если бэкенд вернул пустой объект
                capacity: maxGuests,
            };
            onAddRoom(roomWithDisplayInfo); // Передаем созданную комнату в родительский компонент

            // Сброс формы
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
            setSelectedHotelId("");
            alert("Комната успешно добавлена!");
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Ошибка при добавлении комнаты: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold text-[#1A1A1A]">Add Room</h2>
                <p className="text-[14px] text-[#8A8A8A]">
                    Fill in the room information and add it to an existing hotel
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Выпадающий список для выбора отеля */}
                <div className="flex flex-col gap-2 md:col-span-2 border-b pb-4">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Select Hotel</label>
                    {loadingHotels && <p>Loading hotels...</p>}
                    {errorHotels && <p className="text-red-500">{errorHotels}</p>}
                    {!loadingHotels && fetchedHotels.length === 0 && !errorHotels && (
                        <p>No hotels available. Please add a hotel first.</p>
                    )}
                    {!loadingHotels && fetchedHotels.length > 0 && (
                        <select
                            value={selectedHotelId}
                            onChange={(e) => setSelectedHotelId(e.target.value)}
                            className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                            required
                        >
                            <option value="" disabled>Select a hotel</option>
                            {fetchedHotels.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.name} ({hotel.city})
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Блок 1: Основная информация */}
                <div className="md:col-span-2">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3">General Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Room Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Deluxe Double Room"
                            required
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <FormInput
                                label="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                placeholder="120"
                                required
                            />
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
                        </div>
                        <FormInput
                            label="Max Guests"
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            type="number"
                            min="1"
                            required
                        />
                    </div>
                </div>

                {/* Блок 2: Удобства */}
                <div className="md:col-span-2 py-4 border-y">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        {[
                            { label: "Free Cancellation", state: freeCancellation, set: setFreeCancellation },
                            { label: "Private Bathroom", state: privateBathroom, set: setPrivateBathroom },
                            { label: "Wi-Fi", state: hasWifi, set: setHasWifi },
                            { label: "Private Pool", state: hasPrivatePool, set: setHasPrivatePool },
                        ].map((item) => (
                            <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.state}
                                    onChange={(e) => item.set(e.target.checked)}
                                    className="h-4 w-4 accent-[#1E66F5]"
                                />
                                <span className="text-[14px] text-[#4A4A4A]">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Блок 3: Кровати */}
                <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[16px] font-bold text-[#1A1A1A]">Beds</h3>
                        <button
                            type="button"
                            onClick={handleAddBed}
                            className="text-[13px] font-semibold text-[#1E66F5] hover:underline"
                        >
                            + Add bed
                        </button>
                    </div>
                    <div className="space-y-3">
                        {beds.map((bed, index) => (
                            <div key={index} className="flex items-end gap-3 bg-[#F9FBFF] p-3 rounded-[16px] border border-[#E8EEF9]">
                                <div className="flex-1">
                                    <label className="text-[12px] font-semibold text-[#8A8A8A] ml-1">Bed Type</label>
                                    <select
                                        value={bed.type}
                                        onChange={(e) => handleUpdateBed(index, "type", e.target.value)}
                                        className="w-full h-[40px] rounded-[12px] border border-[#D9D9D9] px-3 outline-none text-[13px]"
                                    >
                                        <option value="Single bed">Single bed</option>
                                        <option value="Double bed">Double bed</option>
                                        <option value="Queen size bed">Queen size bed</option>
                                        <option value="King size bed">King size bed</option>
                                        <option value="Sofa bed">Sofa bed</option>
                                    </select>
                                </div>
                                <div className="w-24">
                                    <label className="text-[12px] font-semibold text-[#8A8A8A] ml-1">Count</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={bed.count}
                                        onChange={(e) => handleUpdateBed(index, "count", e.target.value)}
                                        className="w-full h-[40px] rounded-[12px] border border-[#D9D9D9] px-3 outline-none text-[13px]"
                                    />
                                </div>
                                {beds.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveBed(index)}
                                        className="h-[40px] px-3 text-red-500 hover:bg-red-50 rounded-[12px] transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Блок 4: Фото */}
                <div className="md:col-span-2 pt-4 border-t">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#1A1A1A]">
                            Room Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setPreviewImageFile(file);
                                if (file) {
                                    setPreviewImageUrl(URL.createObjectURL(file));
                                } else {
                                    setPreviewImageUrl(null);
                                }
                            }}
                        />
                    </div>
                    {previewImageUrl && (
                        <div className="mt-2 rounded-[16px] overflow-hidden border h-32 w-full md:w-48">
                            <img
                                src={previewImageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Invalid+URL"; }}
                            />
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="h-[50px] rounded-full bg-[#1E66F5] px-6 text-white"
                        disabled={loadingHotels || fetchedHotels.length === 0}
                    >
                        Add Room
                    </button>
                </div>
            </form>
        </div>
    );
}