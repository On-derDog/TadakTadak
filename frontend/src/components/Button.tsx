export const Button = ({onClick,label,...rest})=>{
    return(
      <button onClick={onClick}{...rest}>
        {label}
      </button>
    )
  }