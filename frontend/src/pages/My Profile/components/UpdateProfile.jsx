import "../settings.scss";
import Button from "react-bootstrap/esm/Button";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useRefreshToken from "../../../hooks/useRefreshToken";

export default function UpdateProfile() {
  const { auth, setAuth } = useAuth();
  const refresh= useRefreshToken();

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PF = "http://localhost:5000/images/";


  const validateUsername = () => {
    const regex = /^[A-Za-z0-9]{3,16}$/;
    return regex.test(username);
  };

  const validatePassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,20}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    if (username!="" && !validateUsername()) {
      toast.error('Geçersiz kullanıcı adı. Lütfen en az 3 en fazla 16 karakter kullanın.');
      return;
    }

    if (password!="" && !validatePassword()) {
      toast.error('Geçersiz şifre biçimi. Lütfen en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam kullanın.');
      return;
    }

    let filename;

    if (file) {
      const formData = new FormData();
      filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);

      try {
        const res = await axios.post("/api/upload", formData);
        console.log("RES", res.data);
      } catch (err) {
        console.log(err);
      }
    }

    try {

      const newAccessToken = await refresh();
      console.log("Yeni accessToken:",newAccessToken)

      const res = await axios.put("api/users/profile", {
        username,
        email,
        password,
        profilePic: file ? filename : "",
      }, { headers: {
        Authorization: `Bearer ${newAccessToken}`,
    }});
      console.log("filename", filename);
   
      await setAuth(prev => {
        return { ...prev,username,email, profilePic: file ? filename : "" }
    });
     
      toast.success('Başarıyla güncellendi.');
    } catch (err) {
      toast.error('Güncellenemedi.')
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
              src={file ? URL.createObjectURL(file) : PF + auth.profilePic}
              alt=""
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="settingsPPInput ml-3"
              style={{ background: 'transparent' }}
            />
          </div>
          <label>Kullanıcı adı</label>
          <input
            type="text"
            placeholder={auth.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={auth.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Şifre</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className=" mt-3" type="submit" variant="light">
            Güncelle
          </Button>
        </form>
      </div>
    </div>
  );
}
