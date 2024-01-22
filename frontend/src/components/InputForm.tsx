export const InputForm = ({type, onChange, placeholder,title,  ...rest}) =>{
  return(<>
    <span>{title}</span>
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      {...rest}
    />

  </>)
}