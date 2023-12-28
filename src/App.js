
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuNav from './components/menu/MenuNav.js';
import ContentComponent from './components/contentComponent/ContentComponent.js';
import Homepage from './pages/homepage/Homepage.js';
import CharacterPage from './pages/character/CharacterPage.js';
import EpisodesPage from './pages/episodes/EpisodesPage.js';
import LocationsPage from './pages/locationsPage/LocationsPage.js';

import { Layout, theme, ConfigProvider } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#208D45',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '208D45',

        colorFill: '#208D45',

        headerBg: '#208D45',

        bodyBg: '#208D45',

        headerColor: 'rgba(0, 0, 0, 0.88)',
      },
    }}>
    <BrowserRouter>
    <Layout style={{ minHeight: '100vh' }}>

      <Header>
          <MenuNav/>
      </Header>


      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
        className='wrap'
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          <div className="App">
            <div className='stars'></div>
          
          <ContentComponent>
            
            <Routes>
              <Route path="/">
                <Route index element={<Homepage />} />
              </Route>

              <Route path="/characters/:characterId">
                <Route index element={<CharacterPage />} />
              </Route>

              <Route path="/episodes">
                <Route index element={<EpisodesPage />} />
              </Route>

              <Route path="/locations">
                <Route index element={<LocationsPage />} />
              </Route>
            </Routes>
          </ContentComponent>
        
          

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
    </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;


