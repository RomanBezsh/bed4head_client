import logo from "/logo.svg";

export const Header = () => {
    return (
        <header className="w-full h-[80px] flex items-center justify-center bg-white">
            <div className="w-full max-w-[1440px] px-8 flex items-center justify-between">

                <img
                    src={logo}
                    alt="Logo"
                    className="w-[167px] h-[33px]"
                />

                <div className="flex items-center gap-4">

                    <button
                        className="w-[32px] h-[32px] border-none overflow-hidden
                       hover:opacity-80 transition-opacity
                       flex items-center justify-center"
                    >
                        <img
                            src="/language-icons/gb.png"
                            alt="English"
                            className="w-[26px] h-[26px] rounded-full"
                        />
                    </button>

                    <button className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100 transition">
                        Register
                    </button>

                    <button className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100 transition">
                        Sign In
                    </button>

                </div>
            </div>
        </header>
    );
};