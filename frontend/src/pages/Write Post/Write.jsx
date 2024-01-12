import React, { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import Button from 'react-bootstrap/Button';
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(state?.categories || []);


  const categories = [
    { value: "Sanat", label: "Sanat" },
    { value: "Teknoloji", label: "Teknoloji" },
    { value: "Gündem", label: "Gündem" },
    { value: "Spor", label: "Spor" },
    { value: "Gezi", label: "Gezi" },
    { value: "Diğer", label: "Diğer" },
  ];
  

  const navigate = useNavigate();
  const refresh= useRefreshToken(); 

  

const handleClick = async () => {
  let filename;
 
   
 
if(file){
  const formData = new FormData();
   filename= Date.now()+file.name;
  formData.append("name", filename);
  formData.append("file", file);

  try {
  const res = await axios.post("/api/upload", formData);
  console.log("RES",res.data)
  console.log("FILE",file)

} catch (err) {
  console.log(err);
}
}

let response;
try {
 
  const newAccessToken = await refresh();
  console.log("Yeni acessToken:",newAccessToken)


  const headers ={ 
    Authorization: `Bearer ${newAccessToken}`,
   }

  if (state) {  //update
   
    response = await axios.put(`/api/posts/${state._id}`,  {
      title,
      content: value,
      categories: selectedCategories,
      image: file ? filename : "",
    }, { headers });
    await toast.success('Başarıyla güncellendi.');
  } 
  else {  //create
   
    response = await axios.post(`/api/posts/create`,  {
      title,
      content: value,
      categories: selectedCategories,
      image: file ? filename : "",
    }, { headers});
    await toast.success('Başarıyla paylaşıldı.');
  }
  navigate("/");
} catch (err) {
  await toast.error(err.response.data.message);
  console.log(err);
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
          placeholder="Başlık"
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
          <h1>Yayınla</h1>
          <span>
            <b>Durum: </b> Taslak
          </span>
          <span>
            <b>Görünürlük: </b> Herkese açık
          </span>
          <label className="mt-2 mb-1">
            Fotoğraf yükleyin
          </label>
          <input
            
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ background: 'transparent' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          
          <div className="buttons mt-5">
          <Button className="btn" variant="outline-dark" onClick={handleClick }>
  {state ? 'Güncelle' : 'Paylaş'}
</Button>

          </div>
        </div>
        <div className="item">
  <h1>Kategori</h1>
  <div className="cat">
    {categories.map((category) => (
      <div key={category.value} className="cat-item">
        <input
          type="checkbox"
          checked={selectedCategories.includes(category.value)}
          value={category.value}
          id={category.value}
          onChange={handleCategoryChange}
        />
        <label htmlFor={category.value}>{category.label}</label>
      </div>
    ))}
  </div>
</div>
      </div>
    </div></div>
  );
};

export default Write;