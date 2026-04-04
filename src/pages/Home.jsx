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
import easyBookingIcon from "../assets/icons/home/easy_booking_icon.svg";
import securePaymentIcon from "../assets/icons/home/secure_payment_icon.svg";
import relevantInformation from "../assets/icons/home/relevant_information_icon.svg";

const Home = () => {
    const homeFeatures = [
        { icon: easyBookingIcon, text: "Easy booking" },
        { icon: securePaymentIcon, text: "Secure payment" },
        { icon: relevantInformation, text: "Relevant information" },
    ];

    return (
        <div className="flex flex-col">
<div className="overflow-hidden">
    <img
        src={headImage}
        alt=""
        className="
            block w-full object-cover

            h-[112px]
            sm:h-[150px]
            md:h-[150px]
            lg:h-auto lg:aspect-[1920/220]

            object-[50%_50%]

            scale-[2.5] sm:scale-[1.2] md:scale-[1.1] lg:scale-[1]
        "
    />
</div>

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