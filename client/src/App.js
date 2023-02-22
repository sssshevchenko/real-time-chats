import React from 'react';
import Longpulling from './components/Longpulling';
import Eventsourcing from './components/Eventsourcing';
import WebSocket from './components/WebSocket';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <WebSocket />
    </div>
  );
};

export default App;