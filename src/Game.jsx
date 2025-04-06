import React, { useState } from "react";
import Tile from "./Tile";
import Controls from "./Controls";
import { Settings, SquareOutlined, BarChart, StarBorder } from "@mui/icons-material";
import { Box, Paper, Typography, IconButton, Divider } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';

const GRID_SIZE = 5;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

const Game = ({ wallet, setWallet }) => {
  const [betAmount, setBetAmount] = useState(5.00);
  const [numMines, setNumMines] = useState(1);
  const [clickedTiles, setClickedTiles] = useState(new Set());
  const [icons, setIcons] = useState(Array(TOTAL_TILES).fill(null));
  const [winnings, setWinnings] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [available, setAvailable] = useState(true);
  const [displaySummary, setDisplaySummary] = useState(false);

  const mineProbability = numMines / TOTAL_TILES;

  const handleStartGame = () => {
    if (betAmount <= 0 || betAmount > wallet) {
      alert("❌ Not enough money to bet!");
      return;
    }
    setWallet(wallet - betAmount);
    setClickedTiles(new Set());
    setWinnings(0);
    setGameActive(true);
    setAvailable(false);
  };

  const handleCashOut = () => {
    const audio = new Audio("/gem.mp3");
    audio.play();

    setWallet(wallet + winnings);
    setGameActive(false);

    setDisplaySummary(true);
    setTimeout(() => {
      setClickedTiles(new Set());
      setIcons(Array(25).fill(null));
      setAvailable(true);
      setDisplaySummary(false);
    }, 2000);
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
            available={available}
            clickedTiles={clickedTiles}
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
            position: "relative", // Needed to position the overlay on top of the grid
          }}
        >
          {/* Popup shown when gameActive is false */}
          {displaySummary && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#2e4552", // Background color
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                color: "#00e600", // Text color
                zIndex: 10, // Ensure it stays on top
                textAlign: "center", // Center the text
                border: "2px solid #00e600", // Rounded green border
                fontSize: "100px",
                px: 8,
                py: 3,
              }}
            >
              {(winnings / betAmount).toFixed(2)}×
              <Box
                sx={{
                  width: "40%",
                  marginX: "auto", // Center the separator
                  height: "2px",
                  backgroundColor: "#b1bad3", // Separator color
                  marginY: "8px", // Space around the line
                }}
              />
              <Box sx={{ fontSize: "50px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                <span>{winnings.toFixed(2)}</span>
                <PaidIcon sx={{ color: "#83ec1e" }} />
              </Box>
            </Box>
          )}
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
              icons={icons}
              setIcons={setIcons}
              setAvailable={setAvailable}
              numMines={numMines}
              setDisplaySummary={setDisplaySummary}
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
