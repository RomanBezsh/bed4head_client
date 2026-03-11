import avatar from '../../assets/avatar.png';


const Reviews = () => {

    return (
        <div className="flex flex-col gap-8 items-center">
            <h2 className="font-[16px] text-[#717171] font-normal uppercase">reviews</h2>

            <div className="flex flex-row gap-10 ">
                <Review
                    name="Name"
                    hotelName="Hotel Name"
                    photo={avatar}
                    data="12 days ago"
                    text="Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed."
                />
                <Review
                    name="Name"
                    hotelName="Hotel Name"
                    photo={avatar}
                    data="12 days ago"
                    text="Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed."
                />
                <Review
                    name="Name"
                    hotelName="Hotel Name"
                    photo={avatar}
                    data="12 days ago"
                    text="Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed."
                />
            </div>

        </div>
    );
}

const Review = ({name, data, hotelName, photo, text}) => {

    return (
        <div className="flex flex-col border border-[#94D0B4] rounded-[13px] w-[368px] h-[208px] gap-8 px-8 py-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <img className="w-[48px] h-[48px] rounded-full" src={photo} alt={name} />
                    <div className="flex flex-col content-center justify-center">
                        <h2 className="font-[16px] font-bold ">{name}</h2>
                        <span className="font-[16px] font-normal text-[#717171]">{hotelName}</span>
                    </div>
                </div>
                <span className="font-[16px] font-normal text-[#717171]">{data}</span>
            </div>
            <p className="w-[304px] h-[77px] ">{text}</p>
        </div>
    )
}


export default Reviews;