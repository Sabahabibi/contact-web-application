const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700 text-right pr-1 mt-2 font-semibold text-sm">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full shadow-md border mb-1  rounded-lg outline-none placeholder:text-right
        placeholder:pr-2 p-1 "
      />
    </div>
  );
};
export default InputField;
