export const InputForm = ({ type, name, value, onChange, placeholder, title, ...rest }) => {
  return (
    <>
      <span>{title}</span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};
