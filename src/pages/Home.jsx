import headImage from "../assets/independed_images/head_image.jpg";
import Search from "../components/common/Search.jsx";
import AuthModal from "../components/common/Auth/AuthModal.jsx";
import Features from "../components/common/Features.jsx";
import RecommendedHotels from "../components/home/RecommendedHotels.jsx";
import Reviews from "../components/home/Reviews.jsx";
import Advantages from "../components/home/Advantages.jsx";
import Loyalty from "../components/home/Loyalty.jsx";
import RegistrationCTA from "../components/home/RegistrationCTA.jsx";
import Footer from "../components/common/Footer.jsx";
import easyBookingIcon from "../assets/icons/easy_booking_icon.svg";
import securePaymentIcon from "../assets/icons/secure_payment_icon.svg";
import relevantInformation from "../assets/icons/relevant_information_icon.svg";



const Home = () => {

    const homeFeatures = [
        { icon: easyBookingIcon, text: "Easy booking" },
        { icon: securePaymentIcon, text: "Secure payment" },
        { icon: relevantInformation, text: "Relevant information" },
    ];

    return (
        <div className="w-full flex flex-col">
            <img
                src={headImage}
                className="w-full aspect-[1920/220] object-cover object-[50%_50%] block"
                alt=""
            />
            <Search />
            <Features items={homeFeatures} />
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
            <div className="mt-[64px]">
                <RegistrationCTA />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
