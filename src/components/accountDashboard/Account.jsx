import userPlaceholder from "../../assets/icons/user_placeholder.svg";
import editIcon from "../../assets/icons/edit_icon.svg";
import cameraIcon from "../../assets/icons/camera_icon.svg";
import selectArrowIcon from "../../assets/icons/select_arrow_icon.svg";

function FieldInput({ placeholder, note = "", smallNote = "" }) {
    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[14px]">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-[152px] h-[40px] rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[12px] text-[#8F8F8F] outline-none"
                />
                {note && (
                    <span className="text-[12px] text-[#8F8F8F]">
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
}

function FieldSelect({ placeholder }) {
    return (
        <div className="relative">
            <select className="w-[136px] h-[40px] appearance-none rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[12px] text-[#8F8F8F] outline-none">
                <option>{placeholder}</option>
            </select>

            <img
                src={selectArrowIcon}
                alt="arrow"
                className="pointer-events-none absolute right-[14px] top-1/2 h-[10px] w-[10px] -translate-y-1/2"
            />
        </div>
    );
}

function Account() {
    return (
        <div className="min-h-screen bg-[#F8F8F8] px-[20px] py-[18px] font-nunito-sans">
            <div className="mx-auto w-full max-w-[1140px]">
                <h1 className="mb-[14px] text-[18px] font-bold text-[#5A35F2]">
                    Your Account
                </h1>

                <div className="mb-[16px] flex gap-[18px]">
                    <div className="flex h-[138px] w-[440px] overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="flex w-[150px] items-center justify-center bg-[#E9E9E9]">
                            <img
                                src={userPlaceholder}
                                alt="user"
                                className="h-[108px] w-[108px] object-contain opacity-70"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-start px-[16px] py-[12px]">
                            <div className="mb-[12px] flex items-center gap-[8px]">
                                <span className="text-[14px] font-semibold text-[#2C2C2C]">
                                    Your Name
                                </span>

                                <img
                                    src={editIcon}
                                    alt="edit"
                                    className="h-[14px] w-[14px] object-contain opacity-70"
                                />
                            </div>

                            <button className="flex h-[28px] w-[118px] items-center justify-center gap-[8px] rounded-full border border-[#D9D9D9] bg-white text-[11px] text-[#8F8F8F]">
                                <span>Change the photo</span>
                                <img
                                    src={cameraIcon}
                                    alt="camera"
                                    className="h-[13px] w-[13px] object-contain"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="h-[138px] w-[194px] rounded-[10px] border border-[#E5E5E5] bg-white px-[16px] py-[18px] text-[12px] leading-[1.45] text-[#A1A1A1] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <p className="mb-[18px]">
                            Your name will be the only visible information to other users.
                        </p>

                        <p>
                            All other details will remain private and will be utilized to suggest the best offers for you and simplify the booking process.
                        </p>
                    </div>
                </div>

                <div className="rounded-[10px] border border-[#E5E5E5] bg-white px-[18px] py-[18px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex justify-between gap-[30px]">
                        <div className="flex flex-col gap-[14px]">
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

                        <div className="flex flex-col gap-[14px] pr-[140px]">
                            <FieldSelect placeholder="Country" />
                            <FieldSelect placeholder="Ampthill" />
                            <FieldSelect placeholder="Preferred currency" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;