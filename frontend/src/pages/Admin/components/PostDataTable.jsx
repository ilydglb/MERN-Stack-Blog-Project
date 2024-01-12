import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Button as BsButton } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../../hooks/useRefreshToken';


export default function PostsTable() {
  const [posts, setPosts] = useState(null);
  const refresh= useRefreshToken();

  const [post, setPost] = useState({
    _id: null,
    title: '',
    postedBy: '',
  });
  const [selectedPosts, setSelectedPosts] = useState(null);

  const [filteredPosts, setFilteredPosts] = useState(null);
 const [searchValue, setSearchValue] = useState(null);

  const dt = useRef(null);

  const navigate =useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);
  



  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setFilteredPosts(response.data);
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  

  const handleDelete = async (rowData) => {

    
    setPost({
      _id: rowData._id,
    });
    setShowModal(true);
  
    const deletePost = async () => {
      try {
        const newAccessToken = await refresh();
  
        await axios.delete(`/api/posts/${post._id}`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        })
        
        await setShowModal(false);
        await fetchPosts();
        await toast.success('Başarıyla silindi.');
        
      } catch (error) {
        console.error(error);
        await toast.error(error);;
      }
    };

    deletePost();
  };

  const handleMultipleDelete = async () => {

    if (!selectedPosts || selectedPosts.length === 0) {
      await toast.warning('Seçim yapmadınız.');
      return;
    }
    const selectedPostIds = selectedPosts.map((selectedPost) => selectedPost._id);
   // setShowModal(true);
  
    const deletePosts = async () => {
      try {
        const newAccessToken = await refresh();
        await Promise.all(
          selectedPostIds.map(async (postId) => {
            await axios.delete(`/api/posts/${postId}`, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
          })
        );
       // setShowModal(false);
        await fetchPosts(); 
        await toast.success('Seçilenler başarıyla silindi.');
        setSelectedPosts(null); // Clear the selection after deletion
      } catch (error) {
        console.error(error);
        await toast.error(error);
      }
    };

    deletePosts();
  };
  
  

  const handleEyeClick = (rowData) => {
    navigate(`/post/${rowData._id}`, { state: { postId: rowData._id } });
  }

  const filterPosts = (searchValue) => {
    const filtered = posts.filter((post) => {  
      const Match = post.postedBy.includes(searchValue)|| post.title.includes(searchValue);
      return Match; 
  });
  setFilteredPosts(filtered);
  };

  const onFilterChangeForSearch = (event) => {
    setSearchValue(event.target.value);
    filterPosts (event.target.value);
  };

  const header = (
    <div className='flex dt-header'>
     
      <div>
      <h4 style={{color:'#555'}}>Paylaşımları Yönet</h4>
        <InputText 
        type="search" 
        onChange={onFilterChangeForSearch}
        value={searchValue}
        placeholder="Ara..."  
        style={{ marginBottom: '2%', marginTop: '1%', background: 'transparent' }}  
        />
         <Button
              icon="pi pi-search"
              onClick={() => filterPosts(filteredPosts)}
              style={{borderRadius:'2px', backgroundColor:'#465c5a',marginBottom :'2%'}}
            />
      </div>

      <BsButton variant="danger" className='m-3' onClick={handleMultipleDelete}>
        Seçilenleri Sil
      </BsButton>

    </div>
  );


 
  
  return (
    <div>
      
      <div className="mt-3 card" style={{ padding: "15px" }}>
      <DataTable
        ref={dt}
        header={header}
        value={filteredPosts}
        selectionMode="multiple"
        selection={selectedPosts} onSelectionChange={(e) => setSelectedPosts(e.value)} 
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}

      >
          <Column selectionMode="multiple" exportable={false} style={{ width: '3em' }} />
          <Column field="_id" header="Post ID" style={{ width: "25%" }}/>
          <Column field="postedBy" header="Yazar" />
          <Column field="title" header="Başlık" style={{ width: "25%" }} />
           
          <Column body={(rowData) => <Button icon="pi pi-eye"  onClick={() => handleEyeClick(rowData)} className='mt-2' style={{borderRadius:'10px', backgroundColor:'#465c5a'}}/>} header="Oku" />    
          <Column body={(rowData) => <Button icon="pi pi-trash" severity="danger" onClick={() => handleDelete(rowData)} style={{borderRadius:'10px'}} />} header="Sil" />
        </DataTable>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doğrulama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Silmek istediğinizden emin misiniz? Bu eylem geri alınamaz.
        </Modal.Body>
        <Modal.Footer>
          <BsButton variant="secondary" onClick={() => setShowModal(false)}>
            İptal
          </BsButton>
          <BsButton variant="danger" onClick={handleDelete}>
            Sil
          </BsButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
