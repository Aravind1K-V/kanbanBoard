import React, { useEffect } from 'react';

import Navbar from './components/navbar';
import Home from './components/home';

import useStore from './store.js';

import './App.css';

const App = () => {
  const { fetchAllData, loading } = useStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className = "padding-10">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;