import React from "react";

import room from "../../assets/room.jpg";


const Booking = () => {

    return(
        <div className="flex flex-col items-center gap-8 mt-20 mb-20">
            <h2 className="text-[16px] text-[#717171] font-normal uppercase">
                Book
            </h2>
            <Room />
        </div>
    );
};

const Room = () => {

    return (
        <div className="flex flex-row w-296 h-58">
            <div className="flex flex-row">
                <img
                    className="h-58 w-80 rounded-l-[13px]"
                    src={room}
                    alt="Room"
                />
                <div className="flex flex-col pt-[26.88px] pl-[24.88px]">
                    <h2 className="text-[20px] font-bold">Suite with a queen-size bed</h2>
                </div>
            </div>

        </div>
    );
}


export default Booking;