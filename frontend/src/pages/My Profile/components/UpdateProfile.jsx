import "../settings.scss";
import Button from "react-bootstrap/esm/Button";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

export default function UpdateProfile() {

  const {auth, setAuth} =useAuth();

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PF = "http://localhost:5000/images/"
  const headers = {
    Authorization: `Bearer ${auth.accessToken}`, 
  };

  const handleSubmit = async (e) => {
    let filename;
    e.preventDefault();

   if(file){
    const formData = new FormData();
     filename= Date.now()+file.name;
    formData.append("name", filename);
    formData.append("file", file);

    try {
    const res = await axios.post("/api/upload", formData);
    
    console.log("RES",res.data)
    console.log("FILE",file)
    //return res.data;
  } catch (err) {
    console.log(err);
  }
  }
  
   
    
    try {
      const res = await axios.put("api/users/profile", {
      username,
      email,
      password,
      profilePic: file ? filename : "",
      }, {headers});
      console.log("filename",filename);
  await setAuth({username:username, email:email})
     await toast.success('Başarıyla güncellendi.');
    } 
     catch (err) {
    // await toast.error(err.response.data.message);
     console.log(err)
    }
  };

  return (
    <div className="container settings">
      <div className="settingsWrapper">
  
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profil Fotoğrafı</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+auth.profilePic}
              alt=""
            />
         
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="settingsPPInput ml-3"
            />
          </div>
          <label>Kullanıcı adı</label>
          <input type="text" placeholder={auth.username} name="name"  onChange={(e) => setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder="mail@mail.com" name="email"  onChange={(e) => setEmail(e.target.value)} />
          <label>Şifre</label>
          <input type="password" placeholder="password" name="password"  onChange={(e) => setPassword(e.target.value)}/>
          <Button className=" mt-3" type="submit" variant="light">
            Güncelle
          </Button>
        </form>
      </div>
      
    </div>
  );
}