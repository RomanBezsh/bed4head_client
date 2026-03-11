import headImage from "../assets/independed_images/head_image.jpg";
import suppliersIcon from "../assets/icons/suppliers_icon.svg";
import matchIcon from "../assets/icons/match_icon.svg";
import hotelsIcon from "../assets/icons/hotels_icon.svg";
import Search from "../components/common/Search.jsx";
import Features from "../components/common/Features.jsx";
import HotelCard from "../components/catalog/HotelCard.jsx";
import hotelsCardExample from "../assets/hotel_card_example.jpg";


const Catalog = () => {
    const catalogFeatures = [
        { icon: suppliersIcon, text: "Suppliers 60+" },
        { icon: matchIcon, text: "Match 756" },
        { icon: hotelsIcon, text: "Hotels 1323" },
    ];


    const testHotel = {
        img: hotelsCardExample,
        name: "Tourist Hotel",
        stars: 4,
        tags: ["popular", "city_centre", "comfortable"],
        distances: [
            { type: "airport", value: "3.5km" },
            { type: "railway station", value: "4.2km" }
        ],
        description: "Located in the heart of Kiev, our hotel offers a prime location for exploring the city's rich history and culture. Enjoy modern amenities and exceptional service during your stay.",
        rating: 7.9,
        reviewsCount: 345,
        price: 85,
        onChoose: () => alert("Hotel Selected!")
    };

    return (
        <div className="w-full flex flex-col">
            <img
                src={headImage}
                className="w-full aspect-[1920/220] object-cover object-[50%_50%] block"
                alt=""
            />
            <Search />
            <Features items={catalogFeatures} />
            <div className="flex flex-col items-center gap-8">

                <HotelCard {...testHotel} />
                <HotelCard {...testHotel} />
                <HotelCard {...testHotel} />
                <HotelCard {...testHotel} />
                <HotelCard {...testHotel} />
                <HotelCard {...testHotel} />

            </div>

        </div>
    );
}

export default Catalog;