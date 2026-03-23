import React from "react";
import loyaltyImg from "../../assets/independed_images/loyalty_img.jpg";

const Loyalty = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 sm:px-6 md:gap-10 lg:flex-row lg:items-center lg:gap-[60px] lg:px-8">
            {/* Responsive image:
                full width on small screens,
                fixed size on large screens */}
            <img
                src={loyaltyImg}
                className="h-[220px] w-full max-w-[500px] rounded-[13px] object-cover sm:h-[260px] lg:h-[200px] lg:w-[300px]"
                alt="Loyalty"
            />

            {/* Text content */}
            <div className="flex max-w-[700px] flex-col gap-4 text-center lg:text-left">
                <h2 className="text-[16px] font-normal uppercase tracking-widest text-[#717171]">
                    Be our regular
                </h2>

                <div className="flex flex-col gap-4 text-[16px] text-[#222222]">
                    <p>
                        We believe that every customer deserves the best, and we're committed to
                        providing top-class services to all of our clients...
                    </p>
                    <p>
                        So start your search today and discover the amazing rewards waiting for you
                        on our website!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loyalty;