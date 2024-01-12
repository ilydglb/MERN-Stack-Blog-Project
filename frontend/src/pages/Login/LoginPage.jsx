import { useRef, useState, useEffect} from "react";
import axios from 'axios';
import FormInput from "../FormInput";

import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AdminPage from "../Admin/AdminPage";


function LoginPage() {
    const navigate = useNavigate();
    const { setAuth,auth } = useAuth()
  

    const [values, setValues] = useState({
        email: "",
        password: "",
    });


    const inputs = [

        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            required: true,
        },

        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Şifre",
            label: "Şifre",
            required: true,
        },

    ];
    const location = useLocation();
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        let response;
        try {
           response = await axios.post('/api/users/auth', values,{withCredentials: true});

             const accessToken =  response.data.accessToken;
             const role =  response.data.role;
             const username= response.data.username
            // const userId= response.data.userId
             const email=response.data.email;
             const profilePic = response.data.profilePic

           await setAuth({ username, role, email, profilePic, accessToken });
            
             console.log(accessToken)
             console.log(response.data.accessToken)
             console.log(response.data.accessToken)
         
             console.log("PRINT AUTH",auth)

             if(accessToken){
              //  navigate('/');
             // const from = navigate.location.state?.from || '/';
             
             //if(auth?.role=='admin'){navigate('/admin-page', { replace: true });}
              const from = location.state?.from?.pathname || "/";
            
            navigate(from, { replace: true });
            }
             
             //console.log("AUTH",auth)
        } catch (error) {

             toast.error(error.response.data.message);
             console.error('Login failed:', error.message);
        }


        setValues({
            email: "",
            password: "",
        });

    };


    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

    };



    return (
    
            <div className="app formcontainer custom ">
                <form>
                    <h1>Giriş Yap</h1>
                    {inputs.map((input) => (

                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />

                    ))}
                    <div className="form-button-container">
                        <Button className="login-btn" variant="outline-light" onClick={handleSubmit}>Giriş</Button>{' '}
                    </div>
                    <span className="line">
          Hesabınız yok mu? <Link to="/register" className="route">Kayıt olun.</Link>
         </span>
                </form>

              
            </div>
            
        
        )
}

export default LoginPage
