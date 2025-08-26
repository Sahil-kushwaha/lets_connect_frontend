const InputField = ({
  label,
  type = "text",
  value,
  className,
  placeholder,
  required,
  handleOnChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <input
        id={label} // Use label as id for accessibility
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleOnChange}
        className={`w-full py-2 px-4 rounded-lg border border-neutral-600 bg-base-100  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white-400 transition-all duration-200${className}`}
      />
    </div>
  );
};

export default InputField;
