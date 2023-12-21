
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuNav from './components/menu/MenuNav.js';
import Homepage from './pages/homepage/Homepage.js';
import CharacterPage from './pages/character/CharacterPage.js';
import EpisodesPage from './pages/episodes/EpisodesPage.js';
import LocationsPage from './pages/locationsPage/LocationsPage.js'

import { Breadcrumb, Layout, Menu, theme } from 'antd';



const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));


const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>aRICKive</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          <div className="App">
      

      <BrowserRouter>
         <MenuNav>
             <Routes>
               <Route path="/">
                 <Route index element={<Homepage />} />
               </Route>

               <Route  path="/characters/:characterId">
                 <Route index element={<CharacterPage/>} />
               </Route>

               <Route  path="/episodes">
                 <Route index element={<EpisodesPage/>} />
               </Route>
               
               <Route  path="/locations">
                 <Route index element={<LocationsPage/>} />
               </Route>
             </Routes>
           </MenuNav>
         </BrowserRouter>
     </div>
     
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        aRICKive ©2023 Created by Perdix
      </Footer>
    </Layout >
  );
};

export default App;
