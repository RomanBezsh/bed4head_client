import headImage from "../assets/independed_images/head_image.jpg";
import Search from "./Search.jsx";
import Features from "./Features.jsx";


const Catalog = () => {

    return (
        <div className="w-full flex flex-col">
            <img
                src={headImage}
                className="w-full aspect-[1920/220] object-cover object-[50%_50%] block"
                alt=""
            />
            <Search />
            <Features />

        </div>
    );
}

export default Catalog;