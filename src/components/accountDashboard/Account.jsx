import { useEffect, useMemo, useRef, useState } from "react";

import userPlaceholder from "../../assets/icons/common/user_placeholder.svg";
import editIcon from "../../assets/icons/common/edit_icon.svg";
import cameraIcon from "../../assets/icons/common/camera_icon.svg";
import selectArrowIcon from "../../assets/icons/common/select_arrow_icon.svg";

import bedIcon from "../../assets/icons/accountDashboard/account/bed_icon.svg";
import freeWifiIcon from "../../assets/icons/accountDashboard/account/free_wifi_icon.svg";
import poolIcon from "../../assets/icons/accountDashboard/account/pool_icon.svg";
import bathIcon from "../../assets/icons/accountDashboard/account/bath_icon.svg";

import calendarIcon from "../../assets/icons/common/calendar.svg";
import plainIcon from "../../assets/icons/common/plain_icon.svg";
import profile2userIcon from "../../assets/icons/common/profile2user.svg";
import noReviewsIcon from "../../assets/icons/common/no_reviews_icon.svg";

import { AuthService } from "../../api/authApi";
import { UserService } from "../../api/userApi";

import hotelRoomPhoto from "../../assets/independed_images/hotel_room_photo_example.png";

const FieldInput = ({ placeholder, note = "", smallNote = "", value = "", onChange, type = "text", disabled = false }) => {
    return (
        <div className="fade-up flex w-full flex-col gap-2">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3.5">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    className="h-14 w-full rounded-full border border-[#D9D9D9] bg-white px-4.5 font-nunito-sans text-[16px] font-normal text-[#717171] outline-none placeholder:text-[#717171] transition-all duration-200 focus:border-[#581ADB] focus:shadow-[0px_0px_0px_3px_rgba(88,26,219,0.1)] md:max-w-62"
                />

                {note && (
                    <span className="text-[12px] text-[#717171] sm:whitespace-nowrap">
                        {note}
                    </span>
                )}
            </div>

            {smallNote && (
                <span className="pl-3 text-[11px] text-[#D3D3D3]">
                    {smallNote}
                </span>
            )}
        </div>
    );
};

const FieldSelect = ({ placeholder, value = "", onChange, options = [] }) => {
    return (
        <div className="fade-up relative w-full md:max-w-62">
            <select
                value={value}
                onChange={onChange}
                className="h-14 w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-4.5 font-nunito-sans text-[16px] text-[#717171] outline-none transition-all duration-200 focus:border-[#581ADB]"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <img
                src={selectArrowIcon}
                alt="arrow"
                className="pointer-events-none absolute right-4.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2"
            />
        </div>
    );
};

const BookingInfoItem = ({ icon, label, text }) => {
    return (
        <div className="flex items-center gap-1.5 text-[11px] text-[#8A8A8A]">
            <img src={icon} alt="" className="h-6 w-6 object-contain" />

            {label && (
                <span className="text-[16px] font-normal text-[#717171]">
                    {label}
                </span>
            )}

            <span className="text-[16px] font-normal text-[#717171]">
                {text}
            </span>
        </div>
    );
};

const BookingStat = ({ icon, value }) => {
    return (
        <div className="flex h-22 min-w-28 flex-1 flex-col items-center justify-center rounded-[10px] border border-[#E5E5E5] bg-white transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)] sm:w-28 sm:flex-none">
            <img
                src={icon}
                alt=""
                className="mb-1.5 h-6 w-6 object-contain"
            />

            <span className="text-center font-nunito-sans text-[16px] font-normal text-[#717171]">
                {value}
            </span>
        </div>
    );
};

const BookingInfo = () => {
    return (
        <div className="flex w-full flex-col lg:flex-row">
            <img
                src={hotelRoomPhoto}
                alt="hotel room"
                className="h-55 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-58 lg:h-58 lg:w-[320px]"
            />

            <div className="flex w-full flex-col justify-between px-3.5 py-2.5 lg:max-w-97.5">
                <div>
                    <h3 className="mb-2 font-nunito-sans text-[20px] font-bold text-[#222222]">
                        Suite with a queen-size bed
                    </h3>

                    <div className="mt-2.5">
                        <BookingInfoItem
                            icon={bedIcon}
                            label="Bed:"
                            text="queen-sized bed 1 | double bed 1"
                        />
                    </div>

                    <div className="mt-3.75">
                        <BookingInfoItem
                            icon={profile2userIcon}
                            label="Guests:"
                            text="maximum 3"
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 lg:mt-10">
                        <BookingInfoItem icon={freeWifiIcon} text="free wi-fi" />
                        <BookingInfoItem icon={bathIcon} text="bath" />
                        <BookingInfoItem icon={poolIcon} text="private pool" />
                    </div>
                </div>

                <div className="mt-4.5 font-nunito-sans text-[16px] font-normal text-[#581ADB]">
                    ✓ FREE cancellation
                </div>
            </div>
        </div>
    );
};

const BookingActions = () => {
    return (
        <div className="flex h-full w-full flex-col justify-between px-4.5 py-3 lg:w-auto">
            <div className="flex flex-wrap gap-2.5">
                <BookingStat icon={plainIcon} value="Kyiv" />
                <BookingStat icon={calendarIcon} value="Apr 9-11" />
                <BookingStat icon={profile2userIcon} value="2 ad. 1 ch." />
            </div>

            <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                <button className="h-14 w-full rounded-[10px] border border-[#6B46FF] text-[12px] font-semibold text-[#6B46FF] transition-all duration-200 hover:bg-[#6B46FF] hover:text-white sm:h-24 sm:w-44">
                    HOTEL PAGE
                </button>

                <button className="h-14 w-full rounded-[10px] border border-[#6B46FF] text-[12px] font-semibold text-[#6B46FF] transition-all duration-200 hover:bg-[#6B46FF] hover:text-white sm:h-24 sm:w-44">
                    BOOKING INFO
                </button>
            </div>

            <div className="mt-3 flex flex-col gap-1.5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                <span className="font-nunito-sans text-[16px] font-normal text-[#6B46FF]">
                    Want to cancel?
                </span>

                <span className="font-nunito-sans text-[16px] font-normal text-[#8A8A8A]">
                    Time left: 4 days 16 hours
                </span>
            </div>
        </div>
    );
};

const BookingCard = () => {
    return (
        <div className="fade-up flex w-full flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] xl:flex-row">
            <BookingInfo />

            <div className="border-t border-[#E5E5E5] xl:border-l xl:border-t-0">
                <BookingActions />
            </div>
        </div>
    );
};

const ReviewsEmpty = () => {
    return (
        <div className="fade-up flex h-58 w-full items-center justify-center rounded-xl border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center justify-center">
                <img
                    src={noReviewsIcon}
                    alt="no reviews"
                    className="mb-2 h-6 w-6 object-contain"
                />

                <span className="font-nunito-sans text-[16px] font-normal text-[#717171]">
                    You have no reviews
                </span>
            </div>
        </div>
    );
};

const formatDateInput = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
};

const buildInitialForm = (user) => ({
    displayName: user?.displayName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    birthDate: formatDateInput(user?.birthDate),
    country: user?.country || "",
    city: user?.city || "",
    preferredCurrencyCode: user?.preferredCurrencyCode || "",
});

const updateStoredUser = (updatedUser) => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
        const parsed = JSON.parse(stored);
        const nextStored = parsed?.user
            ? { ...parsed, user: { ...parsed.user, ...updatedUser } }
            : { ...parsed, ...updatedUser };

        localStorage.setItem("user", JSON.stringify(nextStored));
        window.dispatchEvent(new Event("auth-change"));
    } catch (error) {
        console.error("Failed to update user in localStorage", error);
    }
};

const Account = ({ user, onUserUpdated }) => {
    const fileInputRef = useRef(null);
    const authService = useMemo(() => new AuthService(), []);
    const userService = useMemo(() => new UserService(), []);
    const [form, setForm] = useState(() => buildInitialForm(user));
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
        setForm(buildInitialForm(user));
    }, [user]);

    const updateForm = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setSaveMessage("");
    };

    const handleImageError = (e) => {
        e.target.src = userPlaceholder;
        e.target.classList.remove("object-cover");
        e.target.classList.add("object-contain", "opacity-70");
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!user?.id) {
            console.error("Cannot upload avatar: User ID is missing. Check if you are logged in correctly.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await authService.uploadAvatar(user.id, formData);
            console.log("Avatar uploaded:", response);

            const storedAuth = JSON.parse(localStorage.getItem("user"));

            if (storedAuth && storedAuth.user) {
                const updatedUser = {
                    ...storedAuth.user,
                    avatarUrl: response.url,
                };

                storedAuth.user = updatedUser;
                localStorage.setItem("user", JSON.stringify(storedAuth));
                onUserUpdated?.(updatedUser);
            }

            window.location.reload();
        } catch (error) {
            console.error("Failed to upload avatar:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user?.id) {
            setSaveMessage("You need to log in before saving account data.");
            return;
        }

        setSaving(true);
        setSaveMessage("");

        const payload = {
            ...user,
            displayName: form.displayName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim() || user.email,
            birthDate: form.birthDate || null,
            country: form.country,
            city: form.city,
            preferredCurrencyCode: form.preferredCurrencyCode,
            avatarUrl: user.avatarUrl,
        };

        try {
            await userService.updateUser(user.id, payload);
            const refreshedUser = await userService.getUserProfile(user.id);
            updateStoredUser(refreshedUser);
            onUserUpdated?.(refreshedUser);
            setSaveMessage("Account information saved.");
        } catch (error) {
            console.error("Failed to save account information:", error);
            setSaveMessage(error.response?.data?.message || "Failed to save account information.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mt-10 font-nunito-sans">
            <div className="mx-auto w-full max-w-285 px-4 sm:px-0">
                <h1 className="fade-up mb-3.5 text-[28px] font-bold text-[#5A35F2] sm:text-[36px]">
                    Your Account
                </h1>

                {/* PROFILE */}
                <div className="mb-4 flex flex-col gap-4.5 xl:flex-row">
                    <div className="fade-up flex w-full flex-col overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] md:flex-row xl:max-w-200">
                        <div className="flex h-55 w-full items-center justify-center overflow-hidden bg-[#E9E9E9] md:h-62 md:w-62">
                            <img
                                src={user?.avatarUrl || userPlaceholder}
                                alt="user"
                                onError={handleImageError}
                                className={`h-full w-full ${user?.avatarUrl ? "object-cover" : "object-contain opacity-70"}`}
                            />
                        </div>

                        <div className="flex flex-1 flex-col px-4 py-3">
                            <div className="mb-3 flex items-center gap-2">
                                <input
                                    type="text"
                                    value={form.displayName}
                                    onChange={(event) => updateForm("displayName", event.target.value)}
                                    placeholder="Your Name"
                                    className="min-w-0 flex-1 rounded-full border border-transparent bg-transparent px-2 py-1 text-[20px] font-bold text-[#1E1E1E] outline-none transition-all focus:border-[#D9D9D9] focus:bg-white"
                                />

                                <img
                                    src={editIcon}
                                    alt="edit"
                                    className="h-6 w-6 object-contain opacity-70 transition-transform duration-200 hover:scale-110"
                                />
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />

                            <button
                                onClick={handleUploadClick}
                                className="flex h-11 w-full max-w-48 items-center justify-center gap-2 rounded-full border border-[#D9D9D9] bg-white text-[#717171] transition-all duration-200 hover:bg-[#F6F2FF] sm:h-8"
                            >
                                <span className="text-[16px] font-normal text-[#717171]">
                                    Change the photo
                                </span>

                                <img
                                    src={cameraIcon}
                                    alt="camera"
                                    className="h-6 w-6 object-contain"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="fade-up w-full rounded-[10px] border border-[#E5E5E5] bg-white px-4 py-4.5 text-[12px] leading-[1.45] text-[#717171] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:max-w-81.25">
                        <p className="mb-4.5">
                            Your name will be the only visible information to other users.
                        </p>

                        <p>
                            All other details will remain private and will be utilized to suggest the best offers for you and simplify the booking process.
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="fade-up rounded-[10px] border border-[#E5E5E5] bg-white px-4.5 py-4.5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
                    <div className="flex flex-col gap-5 lg:flex-row lg:gap-7.5">
                        <div className="flex w-full flex-col gap-3.5">
                            <FieldInput
                                placeholder="Your phone number"
                                value={form.phone}
                                onChange={(event) => updateForm("phone", event.target.value)}
                                note="*Has to be confirmed"
                            />

                            <FieldInput
                                placeholder="Your email"
                                value={form.email}
                                onChange={(event) => updateForm("email", event.target.value)}
                                note="*Has to be confirmed"
                            />

                            <FieldInput
                                placeholder="Month  |  Date  |  Year"
                                type="date"
                                value={form.birthDate}
                                onChange={(event) => updateForm("birthDate", event.target.value)}
                                note="Enter your date of birth"
                                smallNote="You will not be able to change your birthday date after confirmation"
                            />
                        </div>

                        <div className="flex w-full flex-col gap-3.5">
                            <FieldInput
                                placeholder="Country"
                                value={form.country}
                                onChange={(event) => updateForm("country", event.target.value)}
                            />
                            <FieldInput
                                placeholder="City"
                                value={form.city}
                                onChange={(event) => updateForm("city", event.target.value)}
                            />
                            <FieldSelect
                                placeholder="Preferred currency"
                                value={form.preferredCurrencyCode}
                                onChange={(event) => updateForm("preferredCurrencyCode", event.target.value)}
                                options={[
                                    { value: "USD", label: "USD" },
                                    { value: "EUR", label: "EUR" },
                                    { value: "UAH", label: "UAH" },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button
                            type="submit"
                            disabled={saving || !user?.id}
                            className="h-12 w-full rounded-full bg-[#581ADB] px-6 font-bold text-white transition-all duration-200 hover:bg-[#6A2BFF] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </button>

                        {saveMessage && (
                            <span className={`text-[14px] ${saveMessage.includes("saved") ? "text-green-600" : "text-red-500"}`}>
                                {saveMessage}
                            </span>
                        )}
                    </div>
                </form>

                {/* BOOKINGS */}
                <div className="mt-5">
                    <h2 className="fade-up mb-2.5 text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                        Your Bookings
                    </h2>

                    <BookingCard />
                </div>

                {/* REVIEWS */}
                <div className="mt-5">
                    <h2 className="fade-up mb-2.5 text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                        Your Reviews
                    </h2>

                    <ReviewsEmpty />
                </div>
            </div>
        </div>
    );
};

export default Account;
