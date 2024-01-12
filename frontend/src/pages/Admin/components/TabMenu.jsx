import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserDataTable from './UserDataTable'
import PostDataTable from './PostDataTable'


function TabMenu() {
  return (
    
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
    >
      <Tab eventKey="users" title="Kullanıcılar">
       <UserDataTable/>
      </Tab>
      <Tab eventKey="posts" title="Paylaşımlar">
      <PostDataTable/>
      </Tab>
    
    </Tabs>
    
  );
}

export default TabMenu;
