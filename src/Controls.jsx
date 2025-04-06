import React, { useState } from "react";
import { Box, Button, TextField, InputAdornment, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';

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
  available,
  clickedTiles,
}) => {
  const convertCadToBitcoin = (cadAmount) => {
    const conversionRate = 0.0000083; // 1 CAD = 0.0000083 BTC
    return cadAmount * conversionRate;
  }

  const handleHalfBet = () => {
    const halved = parseFloat(betAmount) / 2;
    setBetAmount(Math.max(1, halved).toFixed(2));
  };
  
  const handleDoubleBet = () => {
    const doubled = parseFloat(betAmount) * 2;
    setBetAmount(Math.min(wallet, doubled).toFixed(2));
  };

  return (
    <Box
      sx={{
        width: "90%",
        my: 3,
      }}
    >
      <ToggleButtonGroup
        value="manual"  // Always "manual"
        exclusive
        aria-label="alignment"
        sx={{
          display: 'flex',
          borderRadius: '40px',
          border: "3px solid #0f212e",
          position: 'relative',
          width: '100%',
          mb: 2,
        }}
      >
        {/* Manual Button */}
        <ToggleButton
          value="manual"
          aria-label="manual"
          sx={{
            textTransform: 'none',  // Prevent text from being capitalized
            fontSize: '18px',
            flex: 1,
            position: 'relative',
            borderRadius: '30px',
            textAlign: 'center',
            backgroundColor: '#2e4453', // Manual background
            color: gameActive ? '#88949b' : 'white', // Text color based on gameActive
            border: '2px solid #0f212e', // Border color
            '&:hover': {
              backgroundColor: '#213642', // Ensure the background doesn't change on hover
            },
            '&.Mui-selected': {
              color: gameActive ? '#88949b' : 'white', // Text color based on gameActive
              backgroundColor: '#2e4453', // Manual background
              '&:hover': {
                backgroundColor: '#213642', // Ensure the background doesn't change on hover
              },
            },
          }}
        >
          Manual
        </ToggleButton>

        {/* Auto Button */}
        <ToggleButton
          value="auto"
          aria-label="auto"
          sx={{
            textTransform: 'none',  // Prevent text from being capitalized
            fontSize: '18px',
            flex: 1,
            position: 'relative',
            borderRadius: '30px',
            textAlign: 'center',
            backgroundColor: '#0f212e', // Auto background
            color: gameActive ? '#88949b' : 'white', // Text color based on gameActive
            border: '2px solid #0f212e', // Border color
            '&:hover': {
              backgroundColor: '#213642', // Ensure the background doesn't change on hover
            },
            '&.Mui-selected': {
              color: gameActive ? '#88949b' : 'white', // Text color based on gameActive
            },
          }}
        >
          Auto
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Bet Amount Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 0.5 }}>
        <Typography sx={{ fontSize: "18px", color: "#b1bad3", fontWeight: "bold" }}>Bet Amount</Typography>
        <Typography sx={{ fontSize: "16px", color: "#b1bad3", fontWeight: "bold" }}>{convertCadToBitcoin(wallet).toFixed(8)} BTC</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "stretch", mb: 2 }}>
        <TextField
          type="number"
          value={betAmount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
              setBetAmount(value);
            }
          }}
          onBlur={() => {
            if (betAmount !== '') {
              const formatted = parseFloat(betAmount).toFixed(2);
              setBetAmount(formatted);
            }
          }}
          inputProps={{
            step: "0.01",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PaidIcon sx={{ color: "#83ec1e" }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: "#0f212e",
              borderRadius: "3px 0 0 3px",
              input: { color: "white", fontSize: "18px", my: 0.5 },
              border: "3px solid #2e4552",
            },
          }}
          disabled={gameActive}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Box sx={{ position: "relative", display: "flex" }}>
          <Button
            onClick={handleHalfBet}
            disabled={gameActive}
            sx={{
              borderRadius: 0,
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#2e4552",
              '&:hover': { backgroundColor: "#293f4b" },
              '&.Mui-disabled': { color: "#88949b" },
            }}
          >
            ½
          </Button>

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "25%",
              bottom: "25%",
              width: "2px",
              backgroundColor: "#0f212e",
              zIndex: 1,
            }}
          />

          <Button
            onClick={handleDoubleBet}
            disabled={gameActive}
            sx={{
              borderRadius: "0 3px 3px 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#2e4552",
              '&:hover': { backgroundColor: "#293f4b" },
              '&.Mui-disabled': { color: "#88949b" },
            }}
          >
            2×
          </Button>
        </Box>
      </Box>

      {/* Mines Input */}
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Box width="50%">
          <Typography
            sx={{
              fontSize: "18px",
              color: "#b1bad3",
              fontWeight: "bold",
            }}
          >
            Mines
          </Typography>
        </Box>

        {gameActive && (
          <Box width="50%" textAlign="left">
            <Typography
              sx={{
                fontSize: "18px",
                color: "#b1bad3",
                fontWeight: "bold",
                ml: 1,
              }}
            >
              Gems
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <TextField
          value={numMines}
          onChange={(e) => setNumMines(parseInt(e.target.value) || 1)}
          onBlur={() => {
            if (numMines > 24) setNumMines(24);
          }}
          InputProps={{
            sx: {
              backgroundColor: gameActive ? "#2e4552" : "#0f212e",
              borderRadius: "3px",
              border: gameActive ? "none" : "3px solid #2e4552",
              input: { color: "white", my: 0.5 },
            },
          }}
          size="small"
          sx={{ width: gameActive ? "50%" : "100%" }}
          disabled={gameActive}
        />

        {gameActive && (
          <TextField
            value={25 - numMines - clickedTiles.size}
            InputProps={{
              sx: {
                backgroundColor: "#2e4552",
                borderRadius: "3px",
                input: { color: "white", my: 0.5 },
              },
            }}
            size="small"
            sx={{ width: "50%" }}
            disabled={gameActive}
          />
        )}
      </Box>

      {/* Start / Cash Out Buttons */}
      {!gameActive ? (
        <Button
          fullWidth
          onClick={handleStartGame}
          sx={{
            backgroundColor: "#00e600",
            color: "#0d1929",
            fontSize: "18px",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "#00e652" },
            borderRadius: "6px",
            padding: "15px",
            textTransform: 'none',  // Prevent text from being capitalized
          }}
          disabled={!available}
          >
          Bet
        </Button>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 0.5 }}>
            <Typography sx={{ fontSize: "18px", color: "#b1bad3", fontWeight: "bold" }}>Total Profit ({(winnings / betAmount).toFixed(2)}×)</Typography>
            <Typography sx={{ fontSize: "16px", color: "#b1bad3", fontWeight: "bold" }}>{convertCadToBitcoin(winnings).toFixed(8)} BTC</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "stretch", mb: 2 }}>
            <TextField
              value={winnings.toFixed(2)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PaidIcon sx={{ color: "#83ec1e" }} />
                  </InputAdornment>
                ),
              }}
              disabled
              size="small"
              sx = {{
                flexGrow: 1,
                color: "red",
                backgroundColor: "#2e4552",
                borderRadius: "6px",
                input: { color: "white", fontSize: "18px", my: 0.5 },
              }}
            />
          </Box>

          <Button
            fullWidth
            sx={{
              backgroundColor: "#2e4552",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              '&:hover': { backgroundColor: "#293f4b" },
              borderRadius: "6px",
              padding: "10px",
              textTransform: 'none',  // Prevent text from being capitalized
              mb: 2,
            }}
          >
            Pick a random tile
          </Button>

          <Button
            fullWidth
            onClick={handleCashOut}
            sx={{
              backgroundColor: "#00e600",
              color: "#0d1929",
              fontSize: "18px",
              fontWeight: "bold",
              '&:hover': { backgroundColor: "#00e652" },
              borderRadius: "6px",
              padding: "18px",
              textTransform: 'none',  // Prevent text from being capitalized
            }}
          >
            Cashout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Controls;
