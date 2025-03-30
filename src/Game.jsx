import React, { useState } from "react";
import Tile from "./Tile";
import Controls from "./Controls";
import { Settings, SquareOutlined, BarChart, StarBorder } from "@mui/icons-material";
import { Box, Paper, Typography, IconButton, Divider } from "@mui/material";

const GRID_SIZE = 5;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

const Game = ({ wallet, setWallet }) => {
  const [betAmount, setBetAmount] = useState(10);
  const [numMines, setNumMines] = useState(1);
  const [clickedTiles, setClickedTiles] = useState(new Set());
  const [winnings, setWinnings] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const mineProbability = numMines / TOTAL_TILES;

  const handleStartGame = () => {
    if (betAmount > wallet) {
      alert("❌ Not enough money to bet!");
      return;
    }
    setWallet(wallet - betAmount);
    setClickedTiles(new Set());
    setWinnings(0);
    setGameActive(true);
  };

  const handleCashOut = () => {
    alert(`🎉 You cashed out with $${winnings.toFixed(2)}!`);
    setWallet(wallet + winnings);
    setGameActive(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="85vh" mt={15} mx="300px">
      <Box display="flex" height="80vh" gap={0} justifyContent="center" alignItems="stretch">
        <Paper
          sx={{
            flex: 1,
            backgroundColor: "#213642",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px 0 0 0",
          }}
        >
          <Controls
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            numMines={numMines}
            setNumMines={setNumMines}
            handleStartGame={handleStartGame}
            handleCashOut={handleCashOut}
            winnings={winnings}
            gameActive={gameActive}
            wallet={wallet}
          />
        </Paper>
        <Paper
          sx={{
            flex: 3,
            p: 2,
            backgroundColor: "#0f202f",
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, // Distribute columns evenly
            gridAutoRows: '1fr', // Ensure rows automatically adjust to available height
            gap: 2, // Increased gap for better spacing
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0 10px 0 0",
          }}
        >
          {Array.from({ length: TOTAL_TILES }, (_, index) => (
            <Tile
              key={index}
              isClicked={clickedTiles.has(index)}
              gameActive={gameActive}
              clickedTiles={clickedTiles}
              index={index}
              setClickedTiles={setClickedTiles}
              setWinnings={setWinnings}
              setGameActive={setGameActive}
              mineProbability={mineProbability}
              betAmount={betAmount}
            />
          ))}
        </Paper>
      </Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0f202f",
          height: "75px",
          borderRadius: "0 0 10px 10px",
          px: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1} color="white">
          <IconButton sx={{ color:"#96a0b7" }}><Settings /></IconButton>
          <IconButton sx={{ color:"#96a0b7" }}><SquareOutlined /></IconButton>
          <IconButton sx={{ color:"#96a0b7" }}><BarChart /></IconButton>
          <IconButton sx={{ color:"#96a0b7" }}><StarBorder /></IconButton>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: "#213642", width: "1px" }} />
        </Box>
        <img src="https://www.casinos.info/wp-content/uploads/stake-casino-logo-color.png" alt="Stake" style={{ 
              width: '100px',
              height: '60px',
              objectFit: 'cover',
              overflow: 'hidden',
        }} />
        <Typography color="#96a0b7" sx={{ fontWeight: "bold" }}>Fairness</Typography>
      </Paper>
    </Box>
  );
};

export default Game;
