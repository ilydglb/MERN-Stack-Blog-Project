import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateProfile from './UpdateProfile';
import DeleteAc from './DeleteAc';
import MyPosts from "./MyPosts.jsx";

function TabMenu() {
  return (
    
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"

    >
      <Tab eventKey="profile" title="Profili Güncelle">
        <UpdateProfile />
      </Tab>
     
      <Tab eventKey="sharings" title="Paylaşımlarım">
        <MyPosts/>
      </Tab>
      <Tab eventKey="deleteAccount" title="Hesabı Sil">
        <DeleteAc />
      </Tab>
    </Tabs>
    
  );
}

export default TabMenu;
