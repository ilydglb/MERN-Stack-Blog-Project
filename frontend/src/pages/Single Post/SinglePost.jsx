import { Link } from "react-router-dom";
import "./singlePost.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import DOMPurify from "dompurify";
import Button from 'react-bootstrap/Button';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function SinglePost() {
  const location = useLocation();

  const { postId = null, postInfo = null } = location.state || {};
  //const { postId } = location.state;
 const [post,setPost]=useState()
 const PF="http://localhost:5000/images/";
 const {auth} = useAuth();
 const [showModal, setShowModal] = useState(false);
 const navigate =useNavigate()
 const headers = {
  Authorization: `Bearer ${auth?.accessToken}`, 
};


 useEffect(() => {
  console.log('POSTUM ', post);
}, [post]);

  useEffect(() => {
    console.log('ID ',postId)
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
       setPost(response.data.post)
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
    
  }, []);
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const handleDelete = (e) => {
    e.preventDefault()
     const deletePost = async() =>{
    try {
        const response = await axios.delete(`/api/posts/${post._id}` ,{headers});
       
      } catch (error) {
        console.error(error);
      }
      //await toast.success('Başarıyla silindi.');
      navigate('/'); 
    };
    deletePost();

    setShowModal(false);
  };

  

  return (
    post ? (
      <div className="app">
      
        <div className="singlePost container">
          <div className="singlePostWrapper">
            <img
              className="singlePostImg"
              src={PF + post.image}
              alt=""
            />
            <h1 className="singlePostTitle">
              {post.title}
              <div className="singlePostEdit">

          {(auth?.username == post.postedBy )?      
         ( <div className="buttons" >
          <Button className="btn mr-2" variant= 'danger'  onClick={() => setShowModal(true)} ><MdDeleteOutline style={{fontSize:19}} /></Button>

          <Link to="/write?edit=2"  state={post}>
          <Button className="btn " variant= 'outline-light ' style={{backgroundColor:'#465c5a'}} ><FaRegEdit className="mb-1" /></Button>
    </Link>
         
          </div>) : <></>}
              </div>
            </h1>
            <div className="singlePostInfo">
              <span>
                Yazan:
                <b className="singlePostAuthor">
                  <Link to="/posts?username=Safak" className='route'>
                    {post.postedBy}
                  </Link>
                </b>
              </span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p className="singlePostDesc">
  <> 
    <div dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(post.content),
    }} />
  </>
</p>
            
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doğrulama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Emin misiniz?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            İptal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    
    ) : null
    
  );
  
}