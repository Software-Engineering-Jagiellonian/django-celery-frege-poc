import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import { SideMenu } from './components/sideMenu/SideMenu';
import { Navbar } from './components/navbar/Navbar';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import WidgetsContainer from './components/widgets/widgetsContainer/WidgetsContainer';
import { ManualDashboard } from './components/pages/manualDashboard/ManualDashboard';

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  useEffect(() => {
    document.title = 'Frege';
  }, []);

  return (
    <div className={styles.App}>
      <Navbar onMenuClick={() => setIsMenuCollapsed(!isMenuCollapsed)} />
      <div className={styles.ContentNav}>
        <SideMenu className={isMenuCollapsed ? styles.hidden : undefined} />
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path={'/dashboard/automatic/:dashboardId'} element={<WidgetsContainer />} />
            <Route path={'/dashboard/manual/:dashboardId'} element={<ManualDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
