import headImage from "../assets/independed_images/head_image.jpg";
import Search from "./Search.jsx";
import AuthModal from "./AuthModal.jsx";
import Features from "./Features.jsx";
import RecommendedHotels from "./RecommendedHotels.jsx";
import Reviews from "./Reviews.jsx";
import Advantages from "./Advantages.jsx";
import Loyalty from "./Loyalty.jsx";


const MainContent = () => {
    return (
        <div className="w-full flex flex-col">
            <img
                src={headImage}
                className="w-full aspect-[1920/220] object-cover object-[50%_50%] block"
                alt=""
            />
            <Search />
            <Features />
            <RecommendedHotels />
            <div className="mt-[66px]">
                <Reviews />
            </div>
            <div className="mt-[61px]">
                <Advantages />
            </div>
            <div className="mt-[61px]">
                <Loyalty />
            </div>
        </div>
    );
};

export default MainContent;
