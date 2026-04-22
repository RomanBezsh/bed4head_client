import React from "react";
import Room from "../common/Room.jsx";

const Book = () => {
    // Room tags passed into every room card
    const currentTags = ["free wi-fi", "bath", "private pool"];

    return (
        <section className="flex flex-col items-center gap-6 sm:gap-8 mt-14 sm:mt-16 lg:mt-20 mb-14 sm:mb-16 lg:mb-20 px-4 sm:px-6">
            {/* Section title */}
            <h2 className="text-[14px] sm:text-[16px] text-[#717171] font-normal uppercase text-center">
                Book
            </h2>

            {/* Rooms list */}
            <div className="w-full max-w-[1200px] flex flex-col gap-6 sm:gap-8">
                <Room tags={currentTags} />
                <Room tags={currentTags} />
                <Room tags={currentTags} />
                <Room tags={currentTags} />
            </div>
        </section>
    );
};

export default Book;