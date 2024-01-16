import { useState } from "react";
import axios from 'axios'
import FormInput from "../../FormInput.js";
import Button from 'react-bootstrap/Button';
import { toast} from 'react-toastify';

import Password from './Password.jsx'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  
  const navigate = useNavigate();
  
  // State to store form input values
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Kullanıcı adı",
      errorMessage:
        "Kullanıcı adı 3-16 karakterden oluşmalı ve herhangi bir özel karakter içermemelidir!",
      label: "Kullanıcı adı",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Geçerli bir email adresi girin!",
      label: "Email",
      required: true,
    },
   
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Şifre",
      errorMessage:
        "Şifre 8-20 karakterden oluşmalı ve en az 1 harf, 1 rakam ve 1 özel karakter içermelidir!",
      label: "Şifre",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,20}$`,
      required: true,
    }, 
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Şifre Doğrulama",
      errorMessage: "Şifreler eşleşmiyor!",
      label: "Şifre Doğrulama",
      pattern: values.password,
      required: true,
    },
  ];

  const handleRegister = async () => {
    let response;
    try {
     response = await axios.post('/api/users/register',  values);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      
      toast.error(error.response.data.message);
      console.error('Registration failed:', error.message);
      return false
    }
    return true
  };
  

  const USER_REGEX = new RegExp(inputs[0].pattern);
  const PWD_REGEX = new RegExp(inputs[2].pattern);
const validateForm = () => {
    if (!USER_REGEX.test(values.username)) {
    
      return false;
    }

    if (!PWD_REGEX.test(values.password)) {

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if(await handleRegister()){navigate('/login')}
      } catch (error) {
        console.error('Error during registration:', error);
       
      }
    }
    else{toast.error('Lütfen doğrulamaları kontrol ediniz.')}
  };
  

  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
   
  };

  

  return (
  <div className="app">
    <div className="formcontainer">
      <form>
        <h1>Kayıt Ol</h1>
        {inputs.map((input) => (
        
        <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
       
        ))}
       
      </form>
        <div className="form-button-container">
          <Button className="btn" variant="outline-light"onClick={handleSubmit}>Kayıt Ol</Button>{' '}
        </div>
        <span className="line">
          Hesabınız var mı? <Link to="/login" className="route">Giriş yapın.</Link>
         </span>
         
    </div>
    </div>    
   
   
  );
};

export default RegisterPage;
