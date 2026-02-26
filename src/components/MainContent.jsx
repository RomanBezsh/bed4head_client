import headImage from "/independed_images/head_image.jpg";
import SearchButton from "/icons/searchnormal.svg";
import Profile2Users from "/icons/profile2user.svg";
import PlainIcon from "/icons/plain_icon.svg";
import Calendar from "/icons/calendar.svg";
import ArrowsIcon from "/icons/arrows_icon.svg";

const MainContent = () => {
  return (
    <div className="w-full">
      <img src={headImage} className="w-full aspect-[1920/220] object-cover object-[50%_50%] block" alt="" />
       
 <div
  id="searchBar"
  className="-mt-[32px] relative z-50 w-[57.5%] max-w-[1104px] h-[64px] bg-white border border-[#DDDDDD] rounded-[60px] shadow-[0px_4px_69px_rgba(0,0,0,0.05),0px_1px_8px_rgba(0,0,0,0.08)] mx-auto flex items-center px-[20px] gap-[16px]"
>

  <div className="flex items-center gap-[12px] flex-[1.2] min-w-0">
    <img src={PlainIcon} className="h-[24px] w-[24px] block shrink-0" alt="" />
    <input
      type="text"
      className="min-w-0 w-full border-0 outline-none bg-transparent font-nunito-sans text-[14px] font-normal text-[#222222] placeholder:text-[#222222]"
      placeholder="Where are you going?"
    />
  </div>

  <hr className="border-0 w-[1px] h-[24px] bg-[#DDDDDD]" />

  <div className="flex items-center gap-[12px] flex-1 min-w-0">
    <img src={Calendar} className="h-[24px] w-[24px] block shrink-0" alt="" />
    <input
      type="text"
      className="min-w-0 w-full border-0 outline-none bg-transparent font-nunito-sans text-[14px] font-normal text-[#222222] placeholder:text-[#222222]"
      placeholder="Check in - Check out"
    />
  </div>

  <hr className="border-0 w-[1px] h-[24px] bg-[#DDDDDD]" />

  <div className="flex items-center gap-[12px] flex-[1.4] min-w-0">
    <img src={Profile2Users} className="h-[24px] w-[24px] block shrink-0" alt="" />
    <input
      type="text"
      className="min-w-0 w-full border-0 outline-none bg-transparent font-nunito-sans text-[14px] font-normal text-[#222222] placeholder:text-[#222222] whitespace-nowrap"
      placeholder="2 adults 0 children 1 room"
    />
  </div>

  <img src={ArrowsIcon} className="h-[24px] w-[24px] block shrink-0" alt="" />
  <img src={SearchButton} className="h-[36px] w-[36px] block shrink-0" alt="" />
</div>

   
    </div>
  );
};
//24.02.2026 - Файл був створений Крюковим Дмитром і код вище був написаний ним же.
export default MainContent;

