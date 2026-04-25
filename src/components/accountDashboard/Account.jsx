import { useRef } from "react";
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

import hotelRoomPhoto from "../../assets/independed_images/hotel_room_photo_example.png";

const FieldInput = ({ placeholder, note = "", smallNote = "", value = "" }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5">
                <input
                    type="text"
                    placeholder={placeholder}
                    defaultValue={value}
                    className="h-14 w-full rounded-full border border-[#D9D9D9] bg-white px-4.5 text-[16px] font-normal font-nunito-sans text-[#717171] placeholder:text-[#717171] outline-none md:max-w-62"
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

const FieldSelect = ({ placeholder }) => {
    return (
        <div className="relative w-full md:max-w-62">
            <select className="h-14 w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-4.5 text-[16px] text-[#717171] font-nunito-sans outline-none">
                <option>{placeholder}</option>
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
                <span className="text-[#717171] font-normal text-[16px]">
                    {label}
                </span>
            )}
            <span className="text-[#717171] font-normal text-[16px]">
                {text}
            </span>
        </div>
    );
};

const BookingStat = ({ icon, value }) => {
    return (
        <div className="flex h-22 min-w-28 flex-1 sm:flex-none sm:w-28 flex-col items-center justify-center rounded-[10px] border border-[#E5E5E5] bg-white">
            <img
                src={icon}
                alt=""
                className="mb-1.5 h-6 w-6 object-contain"
            />
            <span className="text-[16px] text-[#717171] font-normal font-nunito-sans text-center">
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
                className="h-55 w-full object-cover sm:h-58 lg:h-58 lg:w-[320px]"
            />

            <div className="flex w-full flex-col justify-between px-3.5 py-2.5 lg:max-w-97.5">
                <div>
                    <h3 className="mb-2 font-bold text-[20px] font-nunito-sans text-[#222222]">
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

                <div className="mt-4.5 text-[16px] font-normal font-nunito-sans text-[#581ADB]">
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
                <button className="h-14 w-full rounded-[10px] border border-[#6B46FF] text-[12px] font-semibold text-[#6B46FF] sm:h-24 sm:w-44">
                    HOTEL PAGE
                </button>

                <button className="h-14 w-full rounded-[10px] border border-[#6B46FF] text-[12px] font-semibold text-[#6B46FF] sm:h-24 sm:w-44">
                    BOOKING INFO
                </button>
            </div>

            <div className="mt-3 flex flex-col gap-1.5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[#6B46FF] text-[16px] font-normal font-nunito-sans">
                    Want to cancel?
                </span>
                <span className="text-[#8A8A8A] text-[16px] font-normal font-nunito-sans">
                    Time left: 4 days 16 hours
                </span>
            </div>
        </div>
    );
};

const BookingCard = () => {
    return (
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:flex-row">
            <BookingInfo />

            <div className="border-t border-[#E5E5E5] xl:border-l xl:border-t-0">
                <BookingActions />
            </div>
        </div>
    );
};

const ReviewsEmpty = () => {
    return (
        <div className="flex h-58 w-full items-center justify-center rounded-xl border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col items-center justify-center">
                <img
                    src={noReviewsIcon}
                    alt="no reviews"
                    className="mb-2 h-6 w-6 object-contain"
                />
                <span className="text-[16px] font-normal font-nunito-sans text-[#717171]">
                    You have no reviews
                </span>
            </div>
        </div>
    );
};

const Account = ({ user }) => {
    const fileInputRef = useRef(null);
    const authService = new AuthService();

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
            
            // Обновляем данные в localStorage сразу, чтобы после перезагрузки аватарка подтянулась
            const storedAuth = JSON.parse(localStorage.getItem("user"));
            if (storedAuth && storedAuth.user) {
                storedAuth.user.avatarUrl = response.url;
                // Убеждаемся, что мы сохраняем объект, а не строку
                const updatedUser = { 
                    ...storedAuth.user, 
                    avatarUrl: response.url 
                };
                
                storedAuth.user = updatedUser;
                localStorage.setItem("user", JSON.stringify(storedAuth));
            }

            window.location.reload(); 
        } catch (error) {
            console.error("Failed to upload avatar:", error);
        }
    };

    return (
        <div className="mt-10 font-nunito-sans">
            <div className="mx-auto w-full max-w-285 px-4 sm:px-0">
                <h1 className="mb-3.5 text-[28px] font-bold text-[#5A35F2] sm:text-[36px]">
                    Your Account
                </h1>

                <div className="mb-4 flex flex-col gap-4.5 xl:flex-row">
                    <div className="flex w-full flex-col overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] md:flex-row xl:max-w-200">
                        <div className="flex h-55 w-full items-center justify-center bg-[#E9E9E9] md:h-62 md:w-62 overflow-hidden">
                            <img
                                src={user?.avatarUrl || userPlaceholder}
                                alt="user"
                                onError={handleImageError}
                                className={`h-full w-full ${user?.avatarUrl ? "object-cover" : "object-contain opacity-70"}`}
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-start px-4 py-3">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-[20px] font-bold text-[#1E1E1E]">
                                    {user?.displayName || "Your Name"}
                                </span>

                                <img
                                    src={editIcon}
                                    alt="edit"
                                    className="h-6 w-6 object-contain opacity-70"
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
                                className="flex h-11 w-full max-w-48 items-center justify-center gap-2 rounded-full border border-[#D9D9D9] bg-white text-[11px] text-[#8F8F8F] sm:h-8"
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

                    <div className="w-full rounded-[10px] border border-[#E5E5E5] bg-white px-4 py-4.5 text-[12px] leading-[1.45] text-[#A1A1A1] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:max-w-81.25">
                        <p className="mb-4.5 text-[#717171]">
                            Your name will be the only visible information to other users.
                        </p>

                        <p className="text-[#717171]">
                            All other details will remain private and will be utilized to suggest the best offers for you and simplify the booking process.
                        </p>
                    </div>
                </div>

                <div className="rounded-[10px] border border-[#E5E5E5] bg-white px-4.5 py-4.5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:gap-7.5">
                        <div className="flex w-full flex-col gap-3.5">
                            <FieldInput
                                placeholder="Your phone number"
                                value={user?.phone || ""}
                                note="*Has to be confirmed"
                            />

                            <FieldInput
                                placeholder="Your email"
                                value={user?.email || ""}
                                note="*Has to be confirmed"
                            />

                            <FieldInput
                                placeholder="Month  |  Date  |  Year"
                                note="Enter your date of birth"
                                smallNote="You will not be able to change your birthday date after confirmation"
                            />
                        </div>

                        <div className="flex w-full flex-col gap-3.5">
                            <FieldSelect placeholder={user?.country || "Country"} />
                            <FieldSelect placeholder={user?.city || "City"} />
                            <FieldSelect placeholder="Preferred currency" />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="mb-2.5 text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                        Your Bookings
                    </h2>

                    <BookingCard />
                </div>

                <div className="mt-5">
                    <h2 className="mb-2.5 text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                        Your Reviews
                    </h2>

                    <ReviewsEmpty />
                </div>
            </div>
        </div>
    );
};

export default Account;