import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Button as BsButton } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../../hooks/useRefreshToken';


export default function UserDataTable() {
  const [users,  setUsers] = useState(null);
  const refresh=useRefreshToken();

  const [user, setUser] = useState({
    _id: null,
    username: '',
    email: '',
  });
  const [ selectedUsers, setSelectedUsers] = useState(null);

  const [filteredUsers,  setFilteredUsers] = useState(null);
 const [searchValue, setSearchValue] = useState(null);

  const dt = useRef(null);

  const navigate =useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);



  const fetchUsers = async () => {
    try {
      const newAccessToken = await refresh();
      const response = await axios.get('/api/users',{headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },});
       setFilteredUsers(response.data);
       setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  


  const handleDelete = async (rowData) => {

    
    setShowModal(true);
  
    const deleteUser = async () => {
      try {
        const newAccessToken = await refresh();
  
        const response = await axios.delete(`/api/users/${rowData.username}`,{ headers: {
          Authorization: `Bearer ${newAccessToken}`,
      }},
     );
        
        await setShowModal(false);
        await fetchUsers();
        await toast.success('Başarıyla silindi.');
        
      } catch (error) {
        console.error(error);
        await toast.error(error);;
      }
    };

    deleteUser();
  };

  const handleMultipleDelete = async () => {

    if (!selectedUsers || selectedUsers.length === 0) {
      await toast.warning('Seçim yapmadınız.');
      return;
    }
    const selectedUserNames = selectedUsers.map((selectedUser) => selectedUser.username);
   // setShowModal(true);
  
    const deleteUsers = async () => {
      try {
        const newAccessToken = await refresh();
        await Promise.all(
          selectedUserNames.map(async (username) => {
            await axios.delete(`/api/users/${username}`, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
          })
        );
       // setShowModal(false);
        await fetchUsers(); 
        await toast.success('Seçilenler başarıyla silindi.');
        setSelectedUsers(null); // Clear the selection after deletion
      } catch (error) {
        console.error(error);
        await toast.error(error);
      }
    };

    deleteUsers();
  };

  const  filterUsers = (searchValue) => {
    const filtered = users.filter((user) => {  
      const Match = user.username.includes(searchValue);
      return Match; 
  });
   setFilteredUsers(filtered);
  };

  const onFilterChangeForSearch = (event) => {
    setSearchValue(event.target.value);
     filterUsers (event.target.value);
  };

  const header = (
    <div className='flex dt-header'>
     
      <div>
      <h4 style={{color:'#555'}}>Kullanıcıları Yönet</h4>
        <InputText 
        type="search" 
        onChange={onFilterChangeForSearch}
        value={searchValue}
        placeholder="Ara..."  
        style={{ marginBottom: '2%', marginTop: '1%' }}  
        />
         <Button
              icon="pi pi-search"
              onClick={() =>  filterUsers(filteredUsers)}
              style={{borderRadius:'2px', backgroundColor:'#465c5a',marginBottom:'2%'}}
            />
      </div>

      <BsButton variant="danger" className='m-3' onClick={handleMultipleDelete}>
        Seçilenleri Sil
      </BsButton>

    </div>
  );



  const handleEyeClick = (rowData) => {
    navigate(`/posts/${rowData.username}`, { state: { username: rowData.username } });
  }
  
  return (
    <div>
      
      <div className="mt-3 card" style={{ padding: "15px" }}>
<DataTable
  ref={dt}
  header={header}
  value={filteredUsers}
  selectionMode="multiple"
selection={ selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)} 
paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}

>
          <Column selectionMode="multiple" exportable={false} style={{ width: '3em' }} />
          <Column field="_id" header="Kullanıcı ID" style={{ width: "25%" }}/>
          <Column field="username" header="Kullanıcı adı" />
          <Column field="email" header="Email" style={{ width: "25%" }} />
           
          <Column body={(rowData) => <Button icon="pi pi-eye"  onClick={() => handleEyeClick(rowData)} className='mt-2' style={{borderRadius:'10px', backgroundColor:'#465c5a'}}/>} header="Paylaşımları" />
          
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
