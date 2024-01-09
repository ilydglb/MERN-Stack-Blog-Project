import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Paginator } from 'primereact/paginator';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import useTheme from '../../hooks/useTheme';
import { IoSearch } from "react-icons/io5";

import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

import { Tag } from 'primereact/tag';
 
import { useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";
import { formatDistanceToNow } from 'date-fns';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [btnstate, setBtnState] = useState(0);
  const navigate=useNavigate()
  const { theme } = useTheme();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [currentCats, setCurrentCats] = useState('');

  const PF="http://localhost:5000/images/";
  
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts`);
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        //setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleCardClick =(postId)=> {
    console.log("pip",postId)
    navigate(`/post/${postId}`,{ state: { postId }});
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const itemTemplate = (post) => {
    const distanceToNow = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

    return (
      <div className="flex justify-content-center ml-3 mb-3 card-container ">
        <Card
          title={<div className="card-title mt-3">{post.title}</div>}
          subTitle={  <div className="d-flex justify-content-between">
          <span>by {post.postedBy}</span>
          <span>{distanceToNow}</span>
        </div>}
    header={post.image ? (
      <img alt="Card" src={PF + post.image} className='card-image' />
    ) : (
      <></>
    )}
          footer={<div> <Button className="mt-2 mb-2" variant={theme === 'light' ? 'outline-dark' : 'outline-light'} onClick={() => handleCardClick(post._id)}>Daha fazla oku </Button>
         
          {post.categories.map((category, index) => (
    <Tag key={index} className='p-1 tag mt-3'>{category}</Tag>
))}
          
          </div> }
          className="w-30rem cardd"
        >
                 <p className="m-0 pt-3">
  <> 
    <div dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(post.content.split(' ').slice(0,10).join(' ') +'...'),
    }} />
  </>
</p>
        </Card>
      </div>
    );
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
  };
  const handleF = (e) => {
    e.preventDefault()
    console.log("sdohfnodsnf")
  };

  return (
   < div className='app2'>
    <div className="main-container col-11">

<div className='col-9'>
      <div className="list-grid ">{ }</div>
      <div className="p-grid mb-4">
        <div className="">
          <div className="p-inputgroup">
            <InputText
              placeholder="Ara"
          
              value={''}
              style={{
                borderRadius: "0%",}}
            />
          <Button variant= 'outline-light 'style={{backgroundColor:'#465c5a'}} 
            onClick={() => { handleF()}} >
              <IoSearch 
                        className=''style={{ height: "100%", fontSize: 20,}}/> 
          </Button>
          </div>
        </div>
        <div>
          <Dropdown
            value={``}
            options={''}
            className='mt-3'
            placeholder="Sort"
          />
        </div>
      </div>
      </div>
<div className='flex'>
      <div className="dataview-container col-9">
        <Row>
          {currentPosts.map((post, index) => (
            <Col key={index} md={4} >
              {itemTemplate(post)}
            </Col>
          ))}
        </Row>
        <Paginator
          first={indexOfFirstPost}
          rows={postsPerPage}
          totalRecords={posts.length}
          onPageChange={onPageChange}
          className='paginator'
        />
      </div>
      <div className="category-container col-3">
     
        <div>
          <h2 className='mb-3'>Kategoriler</h2>
            <Button className={btnstate == 1 ? "selected" : " "} onClick={()=>{if(btnstate==0)setBtnState(1);
            else 
            setBtnState(0)}} variant="outline-light" >
              Sanat
            </Button>
            <Button className="btn" variant="outline-light">
              Teknoloji
            </Button>
            <Button className="btn" variant="outline-light">
              Gündem
            </Button>
            <Button className="btn" variant="outline-light">
              Spor
            </Button>
            <Button className="btn" variant="outline-light">
              Hepsi
            </Button>
        </div>
        <div className='trend'><h2>Trend</h2></div>
      </div>
      <div> 
       
      </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
