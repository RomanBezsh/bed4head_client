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

import hotelRoomPhoto from "../../assets/independed_images/hotel_room_photo_example.png";

const FieldInput = ({ placeholder, note = "", smallNote = "" }) => {
    return (
        <div className="flex flex-col gap-[8px] w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[14px]">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="h-[56px] w-full rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[16px] font-normal font-nunito-sans text-[#717171] placeholder:text-[#717171] outline-none md:max-w-[248px]"
                />

                {note && (
                    <span className="text-[12px] text-[#717171] sm:whitespace-nowrap">
                        {note}
                    </span>
                )}
            </div>

            {smallNote && (
                <span className="pl-[12px] text-[11px] text-[#D3D3D3]">
                    {smallNote}
                </span>
            )}
        </div>
    );
};

const FieldSelect = ({ placeholder }) => {
    return (
        <div className="relative w-full md:max-w-[248px]">
            <select className="h-[56px] w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[16px] text-[#717171] font-nunito-sans outline-none">
                <option>{placeholder}</option>
            </select>

            <img
                src={selectArrowIcon}
                alt="arrow"
                className="pointer-events-none absolute right-[18px] top-1/2 h-[10px] w-[10px] -translate-y-1/2"
            />
        </div>
    );
};

const BookingInfoItem = ({ icon, label, text }) => {
    return (
        <div className="flex items-center gap-[6px] text-[11px] text-[#8A8A8A]">
            <img src={icon} alt="" className="h-[24px] w-[24px] object-contain" />
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
        <div className="flex h-[88px] min-w-[112px] flex-1 sm:flex-none sm:w-[112px] flex-col items-center justify-center rounded-[10px] border border-[#E5E5E5] bg-white">
            <img
                src={icon}
                alt=""
                className="mb-[6px] h-[24px] w-[24px] object-contain"
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
                className="h-[220px] w-full object-cover sm:h-[232px] lg:h-[232px] lg:w-[320px]"
            />

            <div className="flex w-full flex-col justify-between px-[14px] py-[10px] lg:max-w-[390px]">
                <div>
                    <h3 className="mb-[8px] font-bold text-[20px] font-nunito-sans text-[#222222]">
                        Suite with a queen-size bed
                    </h3>

                    <div className="mt-[10px]">
                        <BookingInfoItem
                            icon={bedIcon}
                            label="Bed:"
                            text="queen-sized bed 1 | double bed 1"
                        />
                    </div>

                    <div className="mt-[15px]">
                        <BookingInfoItem
                            icon={profile2userIcon}
                            label="Guests:"
                            text="maximum 3"
                        />
                    </div>

                    <div className="mt-[24px] flex flex-wrap gap-[12px] lg:mt-[40px]">
                        <BookingInfoItem icon={freeWifiIcon} text="free wi-fi" />
                        <BookingInfoItem icon={bathIcon} text="bath" />
                        <BookingInfoItem icon={poolIcon} text="private pool" />
                    </div>
                </div>

                <div className="mt-[18px] text-[16px] font-normal font-nunito-sans text-[#581ADB]">
                    ✓ FREE cancellation
                </div>
            </div>
        </div>
    );
};

const BookingActions = () => {
    return (
        <div className="flex h-full w-full flex-col justify-between px-[18px] py-[12px] lg:w-auto">
            <div className="flex flex-wrap gap-[10px]">
                <BookingStat icon={plainIcon} value="Kyiv" />
                <BookingStat icon={calendarIcon} value="Apr 9-11" />
                <BookingStat icon={profile2userIcon} value="2 ad. 1 ch." />
            </div>

            <div className="mt-[10px] flex flex-col gap-[10px] sm:flex-row">
                <button className="h-[56px] w-full rounded-[10px] border border-[#6B46FF] text-[12px] font-semibold text-[#6B46FF] sm:h-[96px] sm:w-[176px]">
                    HOTEL PAGE
                </button>

                <button className="h-[56px] w-full rounded-[10px] border border-[#6B46FF] text-[12px] font-semibold text-[#6B46FF] sm:h-[96px] sm:w-[176px]">
                    BOOKING INFO
                </button>
            </div>

            <div className="mt-[12px] flex flex-col gap-[6px] text-[11px] sm:flex-row sm:items-center sm:justify-between">
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
        <div className="flex w-full flex-col overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:flex-row">
            <BookingInfo />

            <div className="border-t border-[#E5E5E5] xl:border-l xl:border-t-0">
                <BookingActions />
            </div>
        </div>
    );
};

const ReviewsEmpty = () => {
    return (
        <div className="flex h-[232px] w-full items-center justify-center rounded-[12px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col items-center justify-center">
                <img
                    src={noReviewsIcon}
                    alt="no reviews"
                    className="mb-[8px] h-[24px] w-[24px] object-contain"
                />
                <span className="text-[16px] font-normal font-nunito-sans text-[#717171]">
                    You have no reviews
                </span>
            </div>
        </div>
    );
};

const Account = () => {
    return (
        <div className="mt-[40px] font-nunito-sans">
            <div className="mx-auto w-full max-w-[1140px] px-[16px] sm:px-0">
                <h1 className="mb-[14px] text-[28px] font-bold text-[#5A35F2] sm:text-[36px]">
                    Your Account
                </h1>

                <div className="mb-[16px] flex flex-col gap-[18px] xl:flex-row">
                    <div className="flex w-full flex-col overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] md:flex-row xl:max-w-[800px]">
                        <div className="flex h-[220px] w-full items-center justify-center bg-[#E9E9E9] md:h-[248px] md:w-[248px]">
                            <img
                                src={userPlaceholder}
                                alt="user"
                                className="h-full w-full object-contain opacity-70"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-start px-[16px] py-[12px]">
                            <div className="mb-[12px] flex items-center gap-[8px]">
                                <span className="text-[20px] font-bold text-[#1E1E1E]">
                                    Your Name
                                </span>

                                <img
                                    src={editIcon}
                                    alt="edit"
                                    className="h-[24px] w-[24px] object-contain opacity-70"
                                />
                            </div>

                            <button className="flex h-[44px] w-full max-w-[192px] items-center justify-center gap-[8px] rounded-full border border-[#D9D9D9] bg-white text-[11px] text-[#8F8F8F] sm:h-[32px]">
                                <span className="text-[16px] font-normal text-[#717171]">
                                    Change the photo
                                </span>
                                <img
                                    src={cameraIcon}
                                    alt="camera"
                                    className="h-[24px] w-[24px] object-contain"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="w-full rounded-[10px] border border-[#E5E5E5] bg-white px-[16px] py-[18px] text-[12px] leading-[1.45] text-[#A1A1A1] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:max-w-[325px]">
                        <p className="mb-[18px] text-[#717171]">
                            Your name will be the only visible information to other users.
                        </p>

                        <p className="text-[#717171]">
                            All other details will remain private and will be utilized to suggest the best offers for you and simplify the booking process.
                        </p>
                    </div>
                </div>

                <div className="rounded-[10px] border border-[#E5E5E5] bg-white px-[18px] py-[18px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col justify-between gap-[20px] lg:flex-row lg:gap-[30px]">
                        <div className="flex w-full flex-col gap-[14px]">
                            <FieldInput
                                placeholder="Your phone number"
                                note="*Has to be confirmed"
                            />

                            <FieldInput
                                placeholder="Your email"
                                note="*Has to be confirmed"
                            />

                            <FieldInput
                                placeholder="Month  |  Date  |  Year"
                                note="Enter your date of birth"
                                smallNote="You will not be able to change your birthday date after confirmation"
                            />
                        </div>

                        <div className="flex w-full flex-col gap-[14px]">
                            <FieldSelect placeholder="Country" />
                            <FieldSelect placeholder="Ampthill" />
                            <FieldSelect placeholder="Preferred currency" />
                        </div>
                    </div>
                </div>

                <div className="mt-[20px]">
                    <h2 className="mb-[10px] text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                        Your Bookings
                    </h2>

                    <BookingCard />
                </div>

                <div className="mt-[20px]">
                    <h2 className="mb-[10px] text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                        Your Reviews
                    </h2>

                    <ReviewsEmpty />
                </div>
            </div>
        </div>
    );
};

export default Account;