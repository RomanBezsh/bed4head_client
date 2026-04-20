import React from "react";
import loyaltyImg from "../../assets/independed_images/loyalty_img.jpg";

const Loyalty = () => {
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-8 px-4 sm:px-6 md:gap-10 lg:gap-12 lg:px-8">
      
      {/* Заголовок теперь всегда сверху по центру */}
      <h2 className="text-[16px] font-normal uppercase tracking-widest text-[#717171]">
        Be our regular
      </h2>

      {/* Контейнер для фото и текстового блока */}
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-7.5 w-full">
        
        {/* Изображение */}
        <img
          src={loyaltyImg}
          className="h-42.75 w-full max-w-68 rounded-[13px] object-cover sm:h-65 lg:h-auto lg:w-[320px]"
          alt="Loyalty"
        />

        {/* Белый блок с текстом и тенями */}
        <div className="flex flex-1 flex-col justify-center gap-6 rounded-[20px] border border-[#EBEBEB] bg-white pt-[32px] pb-[37px] pl-[32px] pr-[24px] text-left shadow-[0px_4px_69px_0px_#0000000D,0px_1px_8px_0px_#00000014] lg:p-10">
          <div className="flex flex-col gap-4 text-[16px] leading-relaxed text-[#222222]">
            <p>
              We believe that every customer deserves the best, and we're committed to
              providing top-class services to all of our clients. When you book with us, 
              you can enjoy not only great deals on your travel arrangements, but also 
              exclusive discounts and special offers. We value your loyalty and want to 
              show our appreciation by giving back.
            </p>
            <p>
              So start your search today and discover the amazing rewards waiting for you
              on our website!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loyalty;