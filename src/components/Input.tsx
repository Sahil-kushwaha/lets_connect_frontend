const InputField = ({
  label,
  type = "text",
  value,
  className,
  placeholder,
  required,
  handleOnChange,
  handleOnClick,
}) => {
  return (
    <div>
      <label>
        {label}
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          className={`${className}`}
          onChange={(e) => handleOnChange(e)}
          onClick={(e) => handleOnClick(e)}
        />
      </label>
    </div>
  );
};

export default InputField;
