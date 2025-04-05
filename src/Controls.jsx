import React from "react";
import { Box, Button, TextField, InputAdornment, Typography } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';

function convertCadToBitcoin(cadAmount) {
  const conversionRate = 0.0000083; // 1 CAD = 0.0000083 BTC
  return cadAmount * conversionRate;
}

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
      }}
    >
      {/* Bet Amount Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 1 }}>
        <Typography sx={{ fontSize: "18px", color: "#b1bad3", fontWeight: "bold" }}>Bet Amount</Typography>
        <Typography sx={{ fontSize: "14px", color: "#b1bad3", fontWeight: "bold" }}>{convertCadToBitcoin(wallet).toFixed(8)} BTC</Typography>
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

        <Box sx={{ display: "flex" }}>
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
      <Typography sx={{ mb: 1, fontSize: "18px", color: "#b1bad3", fontWeight: "bold" }}>Mines</Typography>
      <TextField
        type="number"
        value={numMines}
        onChange={(e) => setNumMines(parseInt(e.target.value) || 1)}
        InputProps={{
          sx: {
            backgroundColor: "#0f212e",
            borderRadius: "3px",
            border: "3px solid #2e4552",
            input: { color: "white", my: 0.5 },
          },
        }}
        size="small"
        sx={{ mb: 2, width: "100%" }}
        disabled={gameActive}
      />

      {/* Start / Cash Out Buttons */}
      {!gameActive ? (
        <Button
          fullWidth
          onClick={handleStartGame}
          sx={{
            backgroundColor: "#00e600",
            color: "#0d1929",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "#00e652" },
            borderRadius: "3px",
            padding: "10px",
          }}
        >
          Bet
        </Button>
      ) : (
        <>
          <Button
            fullWidth
            onClick={handleCashOut}
            sx={{
              backgroundColor: "#ff5722",
              color: "white",
              fontWeight: "bold",
              '&:hover': { backgroundColor: "#e64a19" },
              borderRadius: "6px",
              padding: "10px",
              mb: 1,
            }}
          >
            Cash Out
          </Button>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
              '&:hover': { backgroundColor: "#1565c0" },
              borderRadius: "6px",
              padding: "10px",
            }}
          >
            Pick a Random Tile
          </Button>
        </>
      )}

      {/* Winnings Display */}
      {gameActive && (
        <Typography sx={{ mt: 2, fontSize: "16px", color: "#00ff5a" }}>
          Current Winnings: ${winnings.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
};

export default Controls;
