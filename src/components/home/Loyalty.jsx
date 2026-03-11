import loyaltyImg from "../../assets/independed_images/loyalty_img.jpg"




const Loyalty = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="font-[16px] text-[#717171] font-normal uppercase">be our regular</h2>
            <div className="flex flex-row gap-8">
                <img
                    className="w-68 h-[171px] rounded-[13px]"
                    src={loyaltyImg}
                    alt={loyaltyImg}
                />
                <div className="w-220 h-42  flex flex-col justify-between border border-gray rounded-[13px] pl-8 pr-6 pt-8 pb-9 text-[#222222]">
                    <p className="">
                        We believe that every customer deserves the best, and we're committed to providing top-class services to all of our clients. When you book with us, you can enjoy not only great deals on your travel arrangements, but also exclusive discounts and special offers. We value your loyalty and want to show our appreciation by giving back.
                    </p>
                    <p>
                        So start your search today and discover the amazing rewards waiting for you on our website!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Loyalty;