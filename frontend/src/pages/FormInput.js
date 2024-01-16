import { useState } from "react";
import { FiEye,FiEyeOff } from "react-icons/fi";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input className="col-7"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
          
        }
        focused={focused.toString()}
      />

{id === 13 && (
          <div className='col-2 icon'>
            <button><FiEye/></button>      
          </div>
        )}
               <span>{errorMessage}</span>
       
    </div>
  );
};

export default FormInput;