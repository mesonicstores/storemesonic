// import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';

import React, { useState } from 'react';
import './App.css';
import Main from './pages/Main';
import { CartProvider } from './context/CartContext';
import SpinWheel from './components/SpinWheel';

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [showSpinWheel, setShowSpinWheel] = useState(true);

  const removeFromBag = (gameId) => {
    setBag(currentBag => currentBag.filter(item => item._id !== gameId));
  };

  const contextValue = {
    library,
    setLibrary,
    bag,
    setBag,
    removeFromBag
  };

  return (
    <CartProvider>
      <div className="App">
        <AppContext.Provider value={contextValue}>
          <Main />
          <SpinWheel 
            isOpen={showSpinWheel}
            onClose={() => setShowSpinWheel(false)}
          />
        </AppContext.Provider>
      </div>
    </CartProvider>
  );
}

export default App;
