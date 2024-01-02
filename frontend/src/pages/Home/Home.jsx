import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Paginator } from 'primereact/paginator';
import axios from 'axios';
import { DataView } from 'primereact/dataview';
import Button from 'react-bootstrap/Button';
import useTheme from '../../hooks/useTheme';


import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

import { Tag } from 'primereact/tag';
 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [btnstate, setBtnState] = useState(0);

  const { theme } = useTheme()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const itemTemplate = (post) => {
    return (
      <div className="flex justify-content-center ml-3 mb-3 card-container ">
        <Card
          title={post.title}
          subTitle={`by ${post.postedBy} Created at: ${new Date(post.createdAt).toLocaleString()} `}
          header={<img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />}
          footer={<div> <Button className="mt-2 mb-2" variant={theme === 'light' ? 'outline-dark' : 'outline-light'}>Daha fazla oku </Button>
         
          {post.categories.map((category, index) => (
    <Tag key={index} className='p-1 tag mt-3'>{category}</Tag>
))}
          
          </div> }
          className="md:w-30rem cardd"
        >
          <p className="m-0 pt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae...

          </p>
         
        </Card>
      </div>
    );
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
  };

  return (
   < div className='app2 '>
    <div className="main-container col-11">

<div className='col-9'>
      <div className="list-grid ">{ }</div>
      <div className="p-grid mb-4">
        <div className="">
          <div className="p-inputgroup">
            <InputText
              placeholder="Ara"
              onChange={''}
              value={''}
            />
            <Button
             
              onClick={() => { }}
            />
           
          </div>
        </div>
        <div>
          <Dropdown
            value={``}
            options={''}
            onChange={''}
            placeholder="Sort"
          />
        </div>
      </div>
      </div>
<div className='flex'>
      <div className="dataview-container col-9">
        <Row>
          {currentPosts.map((post, index) => (
            <Col key={index} md={4}>
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
            setBtnState(0)}} variant="outline-light">
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
