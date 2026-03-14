import UserPlaceholder from "../../assets/icons/user_placeholder.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";
import CameraIcon from "../../assets/icons/camera_icon.svg";
import SelectArrowIcon from "../../assets/icons/select_arrow_icon.svg";

function FieldInput({ placeholder, note = "", smallNote = "" }) {
    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[14px]">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-[248px] h-[56px] rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[16px] font-normal font-nunito-sans text-[#717171] placeholder:text-[#717171] outline-none"
                />

                {note && (
                    <span className="text-[12px] text-[#717171] whitespace-nowrap">
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
        <div className="relative w-[248px]">
            <select className="w-[248px] h-[56px] appearance-none rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[16px] text-[#717171] font-nunito-sans outline-none">
                <option>{placeholder}</option>
            </select>

            <img
                src={SelectArrowIcon}
                alt="arrow"
                className="pointer-events-none absolute right-[18px] top-1/2 h-[10px] w-[10px] -translate-y-1/2"
            />
        </div>
    );
}

function Account() {
    return (
        <div className="min-h-screen  px-[20px] py-[18px] font-nunito-sans">
            <div className="mx-auto w-full max-w-[1140px]">
                <h1 className="mb-[14px] text-[18px] font-bold text-[#5A35F2]">
                    Your Account
                </h1>

                <div className="mb-[16px] flex gap-[18px]">
                    <div className="flex h-[248px] w-[800px] overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="flex h-[248px] w-[248px] items-center justify-center bg-[#E9E9E9]">
                            <img
                                src={UserPlaceholder}
                                alt="user"
                                className="h-[248px] w-[248px] object-contain opacity-70"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-start px-[16px] py-[12px]">
                            <div className="mb-[12px] flex items-center gap-[8px]">
                                <span className="text-[20px] font-bold ">
                                    Your Name
                                </span>

                                <img
                                    src={EditIcon}
                                    alt="edit"
                                    className="h-[24px] w-24px] object-contain opacity-70"
                                />
                            </div>

                            <button className="flex h-[32px] w-[192px] items-center justify-center gap-[8px] rounded-full border border-[#D9D9D9] bg-white text-[11px] text-[#8F8F8F]">
                                <span className="text-[#717171] font-normal text-[16px]">Change the photo</span>
                                <img
                                    src={CameraIcon}
                                    alt="camera"
                                    className="h-[24px] w-[24px] object-contain"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="h-[248px] w-[325px] rounded-[10px] border border-[#E5E5E5] bg-white px-[16px] py-[18px] text-[12px] leading-[1.45] text-[#A1A1A1] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <p className="mb-[18px] text-[#717171]">
                            Your name will be the only visible information to other users.
                        </p>

                        <p className="text-[#717171]">
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

                        <div className="flex flex-col gap-[14px]">
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