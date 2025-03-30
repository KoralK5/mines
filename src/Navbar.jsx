import React from "react";
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";

function convertCadToBitcoin(cadAmount) {
  const conversionRate = 0.0000083; // 1 CAD = 0.0000083 BTC
  return cadAmount * conversionRate;
}

const Navbar = ({ wallet }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1b2b38",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)",
        paddingLeft: '300px',
        paddingRight: '300px'
      }}
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/Stake-com-logo-high-res.jpg" alt="Stake" style={{ 
              width: '100px',
              height: '60px',
              objectFit: 'cover',
              overflow: 'hidden',
        }} />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Left box with money and Bitcoin logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#0f202f', padding: '8px', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, marginRight: 1 }}>
            <span style={{ marginRight: '8px' }}>{convertCadToBitcoin(wallet).toFixed(8)}</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt="Bitcoin" style={{ width: '20px', height: '20px' }} />
          </Typography>
        </Box>

        {/* Right box with "Wallet" text */}
        <Box sx={{ backgroundColor: '#1475e1', padding: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', color: 'white' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginLeft: 1, marginRight: 1 }}>
            Wallet
          </Typography>
        </Box>
      </Box>

      {/* Right side: Search, Profile, Notifications, Chat */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InputBase
          sx={{
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            marginRight: "15px",
            width: "100px",
            "& .MuiInputBase-input::placeholder": {
              opacity: 1
            },
          }}
          placeholder="Search"
          startAdornment={<SearchIcon sx={{ marginRight: "5px" }} />}
        />
        <IconButton sx={{ color: "white", marginRight: "15px" }}>
          <PersonIcon />
        </IconButton>
        <IconButton sx={{ color: "white", marginRight: "15px" }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <ChatIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
