import { useState } from "react";
import Pic1 from "../../assets/independed_images/news_letters_images/first_picture.png";
import Pic2 from "../../assets/independed_images/news_letters_images/second_picture.png";
import Pic3 from "../../assets/independed_images/news_letters_images/third_picture.png";
import Pic4 from "../../assets/independed_images/news_letters_images/fourth_picture.png";
import Pic5 from "../../assets/independed_images/news_letters_images/fifth_picture.png";
import Pic6 from "../../assets/independed_images/news_letters_images/sixth_picture.png";

const TopicCard = ({ image, title, text, selectedTopic, onSelect }) => {
    const isSelected = selectedTopic === title;

    return (
        <div className="w-full overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <img
                src={image}
                alt={title}
                className="h-[150px] w-full object-cover"
            />

            <div className="flex min-h-[230px] flex-col px-[16px] py-[16px]">
                <h3 className="mb-[12px] font-nunito-sans text-[18px] font-bold leading-[100%] text-[#222222] sm:text-[20px]">
                    {title}
                </h3>

                <p className="font-nunito-sans text-[14px] font-normal leading-[24px] text-[#717171] sm:text-[16px]">
                    {text}
                </p>

                <label className="mt-auto flex cursor-pointer items-center gap-[8px]">
                    <input
                        type="radio"
                        name="newsletter-topic"
                        checked={isSelected}
                        onChange={() => onSelect(title)}
                        className="h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-[#B3B3B3] checked:bg-[#581ADB] sm:h-[24px] sm:w-[24px]"
                    />
                    <span className="font-nunito-sans text-[14px] font-normal leading-[24px] text-[#717171] sm:text-[16px]">
                        Choose this topic
                    </span>
                </label>
            </div>
        </div>
    );
};

const Newsletters = () => {
    const [selectedTopic, setSelectedTopic] = useState("");

    return (
        <div className="mt-[40px] font-nunito-sans">
            <div className="mx-auto w-full max-w-[1140px] px-[16px] sm:px-0">
                <h1 className="mb-[18px] text-[28px] font-bold text-[#5A35F2] sm:text-[36px]">
                    Newsletters
                </h1>

                <div className="mb-[20px] flex flex-col gap-[20px] xl:flex-row">
                    <div className="h-[200px] w-full overflow-hidden rounded-[10px] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] sm:h-[232px] xl:max-w-[800px]">
                        <img
                            src={Pic1}
                            alt="newsletter"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="flex w-full flex-col justify-center rounded-[10px] border border-[#E5E5E5] bg-white px-[24px] py-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:max-w-[320px]">
                        <p className="mb-[20px] font-nunito-sans text-[14px] font-normal leading-[24px] text-[#717171] sm:text-[16px]">
                            We curate a daily selection of topics based on your interests and send them straight to your email address.
                        </p>

                        <button className="flex h-[40px] w-full items-center justify-center rounded-[100px] bg-[#581ADB] px-[24px] py-[10px] text-[14px] font-bold uppercase text-white sm:w-fit sm:text-[16px]">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                <h2 className="mb-[12px] text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                    Choose topics
                </h2>

                <div className="mb-[20px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <TopicCard
                        image={Pic2}
                        title="Seasonal offers"
                        text="Discover the finest offers for every season. Every season has its own uniqueness, and we are here to assist you in finding the most exceptional deals."
                        selectedTopic={selectedTopic}
                        onSelect={setSelectedTopic}
                    />

                    <TopicCard
                        image={Pic3}
                        title="Favorite cities"
                        text="We curate a collection of top-rated hotels in the cities you frequent the most, so you don't have to spend time searching for great deals."
                        selectedTopic={selectedTopic}
                        onSelect={setSelectedTopic}
                    />

                    <TopicCard
                        image={Pic4}
                        title="Across the world"
                        text="Are you a frequent traveler across the world? Let us help you find the best international deals!"
                        selectedTopic={selectedTopic}
                        onSelect={setSelectedTopic}
                    />

                    <TopicCard
                        image={Pic5}
                        title="Affordable travel"
                        text="Looking for affordable travel options? Let us find the best budget deals for you."
                        selectedTopic={selectedTopic}
                        onSelect={setSelectedTopic}
                    />
                </div>

                <h2 className="mb-[12px] text-[16px] font-normal uppercase tracking-[0.08em] text-[#717171]">
                    Info
                </h2>

                <div className="flex flex-col gap-[20px] lg:flex-row">
                    <div className="w-full rounded-[10px] border border-[#E5E5E5] bg-white px-[20px] py-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] lg:max-w-[576px]">
                        <p className="font-nunito-sans text-[14px] font-normal leading-[24px] text-[#717171] sm:text-[16px]">
                            Discover captivating travel articles crafted by our expert team. Each week, we curate the most relevant and fascinating texts on selected topics, ensuring our site users enjoy a captivating reading experience.
                        </p>
                    </div>

                    <img
                        src={Pic6}
                        alt="airport"
                        className="h-[184px] w-full rounded-[10px] object-cover shadow-[0px_2px_8px_rgba(0,0,0,0.04)] lg:max-w-[520px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Newsletters;