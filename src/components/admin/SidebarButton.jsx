// Sidebar navigation button component
export default function SidebarButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full rounded-[14px] px-4 py-3 text-left text-[15px] font-semibold transition ${
                active
                    ? "bg-[#1E66F5] text-white"
                    : "text-[#3A3A3A] hover:bg-[#F3F6FB]"
            }`}
        >
            {label}
        </button>
    );
}