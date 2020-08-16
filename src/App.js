import React from 'react';

import './App.css';
import Members from './component/members';


function App() {

  return (
    <div className="container">
      
      
      <Members/>
      
      { <style>{`
          body {
            background-color: #F8F9F9;
          }
        `}</style> }
    </div>
    
  );
}

export default App;
