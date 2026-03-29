import headImage from "../assets/independed_images/head_image.jpg";
import suppliersIcon from "../assets/icons/catalog/suppliers_icon.svg";
import matchIcon from "../assets/icons/catalog/match_icon.svg";
import hotelsIcon from "../assets/icons/catalog/hotels_icon.svg";
import Search from "../components/common/Search.jsx";
import Features from "../components/common/Features.jsx";
import HotelCard from "../components/catalog/HotelCard.jsx";
import hotelsCardExample from "../assets/hotel_card_example.jpg";
import FilterBar from "../components/catalog/FilterBar.jsx";
import Footer from "../components/common/Footer.jsx";

const Catalog = () => {
    // Data for the features section
    const catalogFeatures = [
        { icon: suppliersIcon, text: "Suppliers 60+" },
        { icon: matchIcon, text: "Match 756" },
        { icon: hotelsIcon, text: "Hotels 1323" },
    ];

    // Temporary hotel data for card rendering
    const testHotel = {
        img: hotelsCardExample,
        name: "Tourist Hotel",
        stars: 4,
        tags: ["popular", "city_centre", "comfortable"],
        distances: [
            { type: "airport", value: "3.5km" },
            { type: "railway station", value: "4.2km" }
        ],
        description:
            "Located in the heart of Kiev, our hotel offers a prime location for exploring the city's rich history and culture. Enjoy modern amenities and exceptional service during your stay.",
        rating: 7.9,
        reviewsCount: 345,
        price: 85,
        onChoose: () => alert("Hotel Selected!")
    };

    return (
        <div className="flex w-full flex-col">
            {/* Top banner image */}
            <img
                src={headImage}
                className="block w-full aspect-[1920/220] object-cover object-[50%_50%]"
                alt=""
            />

            {/* Search section */}
            <Search />

            {/* Features section */}
            <Features items={catalogFeatures} />

            {/* Main catalog content: sidebar + hotel cards */}
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 pb-10 lg:flex-row lg:items-start lg:gap-8">
                {/* Filter sidebar on desktop / top bar on mobile */}
                <FilterBar />

                {/* Hotel cards list */}
                <div className="flex min-w-0 flex-1 flex-col items-center gap-8">
                    <HotelCard {...testHotel} />
                    <HotelCard {...testHotel} />
                    <HotelCard {...testHotel} />
                    <HotelCard {...testHotel} />
                    <HotelCard {...testHotel} />
                    <HotelCard {...testHotel} />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Catalog;