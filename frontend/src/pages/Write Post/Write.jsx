import React, { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import Button from 'react-bootstrap/Button';
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from "../../hooks/useAuth";

const Write = () => {
  const {auth}=useAuth();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate()
const headers = {
  Authorization: `Bearer ${auth.accessToken}`, 
};

  const upload = async () => {
    
    
  };


  const handleClick = async (e) => {
    let filename;
    e.preventDefault();
    // const imgUrl = await upload();
    // console.log("img url",imgUrl)
if(file){
    const formData = new FormData();
     filename= Date.now()+file.name;
    formData.append("name", filename);
    formData.append("file", file);
   // post.image=filename;
    try {
    const res = await axios.post("/api/upload", formData);
    console.log("RES",res.data)
    console.log("FILE",file)
    //return res.data;
  } catch (err) {
    console.log(err);
  }
}

let response;
  try {
    
    
    response= await axios.post(`/api/posts/create`, {
      title, 
      content: value,
      categories: selectedCategories,
      image: file ? filename : "",
    }, { headers });
    await toast.success('Başarıyla paylaşıldı.');
    navigate("/home");
  } catch (err) {
    
    await toast.error(err.response.data.message);console.log(err);
  }
};
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(selectedCategory)) {
        // If category is already selected, remove it
        return prevCategories.filter((category) => category !== selectedCategory);
      } else {
        // If category is not selected, add it
        return [...prevCategories, selectedCategory];
      }
    });
  };

  return (
    <div className="app write">
    <div className="add m-auto col-10 mt-5">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          style={{   border: '1px solid lightgray'}}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
           
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="fileInput"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="fileInput">
            Fotoğraf yükleyin
          </label>
          <div className="buttons">
          <Button className="btn mr-2" variant="outline-dark">Taslak olarak kaydet</Button>
          <Button className="btn" variant="outline-dark" onClick={handleClick}>Paylaş</Button>
          </div>
        </div>
        <div className="item">
      <h1>Category</h1>
      {/* Use checkboxes for category selection */}
      <div className="cat">
        <input
          type="checkbox"
          checked={selectedCategories.includes("Sanat")}
          value="Sanat"
          id="Sanat"
          onChange={handleCategoryChange}
        />
        <label htmlFor="Sanat">Sanat</label>
      </div>
      <div className="cat">
        <input
          type="checkbox"
          checked={selectedCategories.includes("Teknoloji")}
          value="Teknoloji"
          id="Teknoloji"
          onChange={handleCategoryChange}
        />
        <label htmlFor="Teknoloji">Teknoloji</label>
      </div>
      <div className="cat">
        <input
          type="checkbox"
          checked={selectedCategories.includes("Gündem")}
          value="Gündem"
          id="Gündem"
          onChange={handleCategoryChange}
        />
        <label htmlFor="Gündem">Gündem</label>
      </div>
      <div className="cat">
        <input
          type="checkbox"
          checked={selectedCategories.includes("Spor")}
          value="Spor"
          id="Spor"
          onChange={handleCategoryChange}
        />
        <label htmlFor="Spor">Spor</label>
      </div>
      <div className="cat">
        <input
          type="checkbox"
          checked={selectedCategories.includes("Diğer")}
          value="Diğer"
          id="Diğer"
          onChange={handleCategoryChange}
        />
        <label htmlFor="Diğer">Diğer</label>
      </div>
    </div>
      </div>
    </div></div>
  );
};

export default Write;