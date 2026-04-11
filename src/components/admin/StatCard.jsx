// Statistics card component
export default function StatCard({ title, value }) {
    return (
        <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <p className="text-[14px] text-[#8A8A8A]">{title}</p>
            <h3 className="mt-2 text-[28px] font-bold text-[#1A1A1A]">{value}</h3>
        </div>
    );
}