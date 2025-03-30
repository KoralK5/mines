import React from "react";

const Controls = ({
  betAmount,
  setBetAmount,
  numMines,
  setNumMines,
  handleStartGame,
  handleCashOut,
  winnings,
  gameActive,
  wallet,
}) => {
  const handleHalfBet = () => {
    setBetAmount(Math.max(1, Math.floor(betAmount / 2)));
  };

  const handleDoubleBet = () => {
    setBetAmount(Math.min(wallet, betAmount * 2));
  };

  return (
    <div>
      <h3>💰 Wallet: ${wallet.toFixed(2)}</h3>

      <label>
        Bet Amount: $
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
          min="1"
          max={wallet}
          disabled={gameActive} // Locked during game
        />
      </label>
      <button onClick={handleHalfBet} disabled={gameActive}>1/2</button>
      <button onClick={handleDoubleBet} disabled={gameActive}>2x</button>

      <br />

      <label>
        Number of Mines:
        <input
          type="number"
          value={numMines}
          onChange={(e) => setNumMines(parseInt(e.target.value) || 1)}
          min="1"
          max="24"
          disabled={gameActive} // Locked during game
        />
      </label>

      <br />

      <button onClick={handleStartGame} disabled={gameActive}>
        Start Game
      </button>

      {gameActive && (
        <>
          <button onClick={handleCashOut}>Cash Out</button>
          <button>Pick a Random Tile</button>
        </>
      )}

      {gameActive && <h3>Current Winnings: ${winnings.toFixed(2)}</h3>}
    </div>
  );
};

export default Controls;
