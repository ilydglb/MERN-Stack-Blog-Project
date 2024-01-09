import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function DeleteAc() {
  const [showModal, setShowModal] = useState(false);
  const navigate =useNavigate()
  const {setAuth} =useAuth()

  const handleDelete = (e) => {
    e.preventDefault()
     const deleteUser = async() =>{
    try {
        const response = await axios.delete(`/api/users/profile`);
       
      } catch (error) {
        console.error(error);
      }
      setAuth(null);
      navigate('/home'); 
    };
    deleteUser();

    setShowModal(false);
  };

  return (
    <div>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Hesabı sil
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doğrulama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Hesabınızı silmek istediğinizden emin misiniz? Bu eylem geri alınamaz. (Bütün paylaşımlarınız da silinecektir).
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
  );
}

export default DeleteAc;
