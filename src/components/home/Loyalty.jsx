import React from 'react';
import loyaltyImg from "../../assets/independed_images/loyalty_img.jpg";

const Loyalty = () => {
    return (
        <div className="w-full max-w-[1200px] mx-auto flex flex-row items-center gap-[60px] px-4">
            <img
                src={loyaltyImg}
                className="w-[300px] h-[200px] object-cover rounded-[13px]"
                alt="Loyalty"
            />
            <div className="flex flex-col gap-4">
                <h2 className="text-[16px] text-[#717171] uppercase font-normal">Be our regular</h2>
                <div className="text-[16px] text-[#222222] flex flex-col gap-4 max-w-[700px]">
                    <p>We believe that every customer deserves the best, and we're committed to providing top-class services to all of our clients...</p>
                    <p>So start your search today and discover the amazing rewards waiting for you on our website!</p>
                </div>
            </div>
        </div>
    );
};

export default Loyalty;