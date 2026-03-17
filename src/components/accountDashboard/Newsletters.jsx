import Pic1 from "../../assets/independed_images/news_letters_images/first_picture.png";
import Pic2 from "../../assets/independed_images/news_letters_images/second_picture.png";
import Pic3 from "../../assets/independed_images/news_letters_images/third_picture.png";
import Pic4 from "../../assets/independed_images/news_letters_images/fourth_picture.png";
import Pic5 from "../../assets/independed_images/news_letters_images/fifth_picture.png";
import Pic6 from "../../assets/independed_images/news_letters_images/sixth_picture.png";

const TopicCard = ({ image, title, text }) => {
    return (
        <div className="w-[245px] overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <img
                src={image}
                alt={title}
                className="h-[150px] w-full object-cover"
            />

            <div className="flex h-[230px] flex-col px-[16px] py-[16px]">
                <h3 className="mb-[12px] font-nunito-sans text-[20px] font-bold leading-[100%] text-[#222222]">
                    {title}
                </h3>

                <p className="font-nunito-sans text-[16px] font-normal leading-[24px] text-[#717171]">
                    {text}
                </p>

                <label className="mt-auto flex cursor-pointer items-center gap-[8px]">
                    <input
                        type="radio"
                        name="newsletter-topic"
                        className="
                            h-[24px]
                            w-[24px]
                            cursor-pointer
                            appearance-none
                            rounded-full
                            border
                            border-[#B3B3B3]
                            checked:bg-[#581ADB]
                        "
                    />
                    <span className="font-nunito-sans text-[16px] font-normal leading-[24px] text-[#717171]">
                        Choose this topic
                    </span>
                </label>
            </div>
        </div>
    );
};

const Newsletters = () => {
    return (
        <div className="mt-[40px] font-nunito-sans">
            <div className="mx-auto w-full max-w-[1140px]">
                <h1 className="mb-[18px] text-[36px] font-bold text-[#5A35F2]">
                    Newsletters
                </h1>

                <div className="mb-[20px] flex gap-[20px]">
                    <div className="h-[232px] w-[800px] overflow-hidden rounded-[10px] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <img
                            src={Pic1}
                            alt="newsletter"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="flex h-[232px] w-[320px] flex-col justify-center rounded-[10px] border border-[#E5E5E5] bg-white px-[24px] py-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <p className="mb-[20px] font-nunito-sans text-[16px] font-normal leading-[24px] text-[#717171]">
                            We curate a daily selection of topics based on your interests and send them straight to your email address.
                        </p>

                        <button className="flex h-[40px] w-fit items-center justify-center rounded-[100px] bg-[#581ADB] px-[24px] py-[10px] text-[16px] font-bold uppercase text-white">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                <h2 className="mb-[12px] text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                    Choose topics
                </h2>

                <div className="mb-[20px] grid grid-cols-4 gap-[18px]">
                    <TopicCard
                        image={Pic2}
                        title="Seasonal offers"
                        text="Discover the finest offers for every season. Every season has its own uniqueness, and we are here to assist you in finding the most exceptional deals."
                    />

                    <TopicCard
                        image={Pic3}
                        title="Favorite cities"
                        text="We curate a collection of top-rated hotels in the cities you frequent the most, so you don't have to spend time searching for great deals."
                    />

                    <TopicCard
                        image={Pic4}
                        title="Across the world"
                        text="Are you a frequent traveler across the world? Let us help you find the best international deals!"
                    />

                    <TopicCard
                        image={Pic5}
                        title="Affordable travel"
                        text="Looking for affordable travel options? Let us find the best budget deals for you."
                    />
                </div>

                <h2 className="mb-[12px] text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                    Info
                </h2>

                <div className="flex gap-[20px]">
                    <div className="w-[576px] rounded-[10px] border border-[#E5E5E5] bg-white px-[20px] py-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                        <p className="font-nunito-sans text-[16px] font-normal leading-[24px] text-[#717171]">
                            Discover captivating travel articles crafted by our expert team. Each week, we curate the most relevant and fascinating texts on selected topics, ensuring our site users enjoy a captivating reading experience.
                        </p>
                    </div>

                    <img
                        src={Pic6}
                        alt="airport"
                        className="h-[184px] w-[520px] rounded-[10px] object-cover shadow-[0px_2px_8px_rgba(0,0,0,0.04)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Newsletters;