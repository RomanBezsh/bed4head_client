import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    // Data for the features section
    const catalogFeatures = [
        { icon: suppliersIcon, text: "Suppliers 60+" },
        { icon: matchIcon, text: "Match 756" },
        { icon: hotelsIcon, text: "Hotels 1323" },
    ];

    // Temporary hotel data list for catalog rendering
    const hotels = [
        {
            id: 1,
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
            phone: "(380) 555-0103",
            city: "Kyiv",
            dateRange: "Apr 9-11",
            guests: "2 ad. 1 ch.",
        },
        {
            id: 2,
            img: hotelsCardExample,
            name: "Royal Plaza",
            stars: 5,
            tags: ["luxury", "city_centre", "business"],
            distances: [
                { type: "airport", value: "5.1km" },
                { type: "railway station", value: "2.8km" }
            ],
            description:
                "A modern premium hotel with spacious rooms, elegant interiors and fast access to the city center.",
            rating: 9.1,
            reviewsCount: 512,
            price: 140,
            phone: "(380) 555-0104",
            city: "Odesa",
            dateRange: "Apr 9-11",
            guests: "2 ad. 1 ch.",
        },
        {
            id: 3,
            img: hotelsCardExample,
            name: "Comfort Stay",
            stars: 3,
            tags: ["budget", "comfortable", "family"],
            distances: [
                { type: "airport", value: "6.2km" },
                { type: "railway station", value: "3.6km" }
            ],
            description:
                "A practical and affordable option for travelers who want a comfortable stay with essential amenities.",
            rating: 8.3,
            reviewsCount: 198,
            price: 65,
            phone: "(380) 555-0105",
            city: "Lviv",
            dateRange: "Apr 9-11",
            guests: "2 ad. 1 ch.",
        },
        {
            id: 4,
            img: hotelsCardExample,
            name: "Grand Residence",
            stars: 5,
            tags: ["popular", "luxury", "comfortable"],
            distances: [
                { type: "airport", value: "4.4km" },
                { type: "railway station", value: "5.0km" }
            ],
            description:
                "A stylish hotel with premium rooms, a great restaurant and excellent guest service.",
            rating: 8.8,
            reviewsCount: 421,
            price: 155,
            phone: "(380) 555-0106",
            city: "Dnipro",
            dateRange: "Apr 9-11",
            guests: "2 ad. 1 ch.",
        },
        {
            id: 5,
            img: hotelsCardExample,
            name: "City Light Hotel",
            stars: 4,
            tags: ["city_centre", "business", "comfortable"],
            distances: [
                { type: "airport", value: "7.0km" },
                { type: "railway station", value: "1.9km" }
            ],
            description:
                "A convenient hotel near the center with modern rooms and easy access to transport.",
            rating: 8.0,
            reviewsCount: 276,
            price: 92,
            phone: "(380) 555-0107",
            city: "Kharkiv",
            dateRange: "Apr 9-11",
            guests: "2 ad. 1 ch.",
        },
        {
            id: 6,
            img: hotelsCardExample,
            name: "Green Park Hotel",
            stars: 4,
            tags: ["family", "comfortable", "popular"],
            distances: [
                { type: "airport", value: "8.4km" },
                { type: "railway station", value: "4.7km" }
            ],
            description:
                "A peaceful hotel with a cozy atmosphere, great for family trips and weekend stays.",
            rating: 8.6,
            reviewsCount: 309,
            price: 98,
            phone: "(380) 555-0108",
            city: "Odesa",
            dateRange: "Apr 9-11",
            guests: "2 ad. 1 ch.",
        },
    ];

    // Open the selected hotel page and pass hotel data through route state
    const handleOpenHotel = (hotel) => {
        navigate(`/hotel/${hotel.id}`, {
            state: {
                hotel: {
                    id: hotel.id,
                    name: hotel.name,
                    stars: hotel.stars,
                    rating: hotel.rating,
                    reviewsCount: hotel.reviewsCount,
                    phone: hotel.phone,
                    image: hotel.img,
                    city: hotel.city,
                    dateRange: hotel.dateRange,
                    guests: hotel.guests,
                    price: hotel.price,
                    tags: hotel.tags,
                    description: hotel.description,
                    distances: hotel.distances,
                },
            },
        });
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
                    {hotels.map((hotel) => (
                        <HotelCard
                            key={hotel.id}
                            {...hotel}
                            onChoose={() => handleOpenHotel(hotel)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Catalog;