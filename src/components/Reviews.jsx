import avatar from '../assets/avatar.png';


const Reviews = () => {

    return (
        <div>
            <h2 className="font-[16px] text-[#717171] font-normal uppercase">reviews</h2>

            <Reviews
                name="Name"
                hotelName="Hotel Name"
                photo={avatar}
                data="12 days ago"
                text="Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed."
            />
        </div>
    );
}

const Review = ({name, data, hotelName, photo, text}) => {

    return (
        <div>
            <div>
                <img src={photo} alt={name} />
                <div>
                    <h2>{name}</h2>
                    <span>{hotelName}</span>
                </div>
                <span>{data}</span>
                <p>{text}</p>
            </div>
        </div>
    )
}


export default Reviews;