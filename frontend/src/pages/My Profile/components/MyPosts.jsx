import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Paginator } from 'primereact/paginator';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import useTheme from '../../../hooks/useTheme';
import { Tag } from 'primereact/tag';
 
import { useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../../../hooks/useAuth';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [btnstate, setBtnState] = useState(0);
  const navigate=useNavigate()
  const { theme } = useTheme();
  
  const {auth} =useAuth();


  const PF="http://localhost:5000/images/";
  
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts?user=${auth.username}`);
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
      <div className="flex justify-content-center ml-3 mb-3  " >
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

  return (
   < div className='app2' style={{ background: 'transparent' }}>
     <div className="mt-3" >
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
      </div>
 
  );
};

export default MyPosts;
