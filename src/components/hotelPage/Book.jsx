import React from "react";
import Room from "../common/Room.jsx";




const Book = () => {
    // Данные для пропсов (можно вынести в массив и мапить Room)
    const currentTags = ["free wi-fi", "bath", "private pool"];

    return (
        <div className="flex flex-col items-center gap-8 mt-20 mb-20">
            <h2 className="text-[16px] text-[#717171] font-normal uppercase">
                Book
            </h2>
            <Room tags={currentTags} />
            <Room tags={currentTags} />
            <Room tags={currentTags} />
            <Room tags={currentTags} />

        </div>
    );
};


export default Book;