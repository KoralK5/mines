import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Game from "./Game";
import './styles.css'; // Import the CSS file

const App = () => {
  const [wallet, setWallet] = useState(() => {
    return parseFloat(localStorage.getItem("wallet")) || 1000;
  });

  useEffect(() => {
    // Update localStorage whenever the wallet changes
    localStorage.setItem("wallet", wallet);
  }, [wallet]);

  return (
    <div>
      <Navbar wallet={wallet} setWallet={setWallet} />
      <Game wallet={wallet} setWallet={setWallet} />
    </div>
  );
}

export default App;
