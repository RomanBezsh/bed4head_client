// Reusable form input component
export default function FormInput({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#1A1A1A]">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none"
            />
        </div>
    );
}