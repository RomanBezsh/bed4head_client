import headImage from "/independed_images/head_image.jpg";
import Search from "./Search.jsx";
import AuthModal from "./AuthModal.jsx";


const MainContent = () => {
  return (
      <div className="w-full">
        <img
            src={headImage}
            className="w-full aspect-[1920/220] object-cover object-[50%_50%] block"
            alt=""
        />
        <Search />
        <AuthModal mode="register" />
      </div>
  );
};

export default MainContent;
