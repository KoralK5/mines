import React, { useState } from "react";
import { Box } from "@mui/material";

const Tile = ({ isClicked, gameActive, clickedTiles, index, setClickedTiles, setWinnings, setGameActive, mineProbability, betAmount }) => {
  const [clicked, setClicked] = useState(false);
  const [icon, setIcon] = useState(null);

  // Handle the click effect animation
  const handleClick = () => {
    if (!gameActive || clickedTiles.has(index)) return;

    setClicked(true);

    const isMine = Math.random() < mineProbability;
    if (isMine) {
      setClickedTiles(new Set());
      setWinnings(0);
      setGameActive(false);
      setTimeout(() => {
        setIcon("bomb");
      }, 150);
    } else {
      const newClickedTiles = new Set(clickedTiles).add(index);
      setClickedTiles(newClickedTiles);
      const newWinnings = betAmount * newClickedTiles.size * 0.2;
      setWinnings(newWinnings);
      setTimeout(() => {
        setIcon("gem");
      }, 150);
    }

    // Reset the clicked state after the animation ends (0.2s)
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        height: "100%",
        transition: "transform 0.2s ease-in-out", // Smooth transition for popping effect
      }}
      onClick={handleClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Scale up slightly on hover
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = clicked ? "scale(1.1)" : "scale(1)") // Scale back on mouse leave, more if clicked
      }
    >
      {/* Shadow Box */}
      <Box
        sx={{
          position: "absolute",
          top: "8px", // Offset shadow for 3D effect
          width: "100%",
          height: "100%",
          backgroundColor: isClicked ? "#071824" : "#1c343d", // Shadow color
          borderRadius: "10px", // Rounded corners for the shadow
          zIndex: 0, // Shadow stays beneath the tile
          transition: "background-color 0.2s ease", // Smooth transition for shadow color change
        }}
      />

      {/* Main Tile Box */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: isClicked ? "#071824" : "#2e4552", // Tile color
          borderRadius: "10px", // Rounded corners for the tile
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Tile is positioned to stay on top
          zIndex: 1, // Tile content stays above the shadow
          cursor: "pointer", // Pointer cursor for interaction
          transition: "transform 0.2s ease, background-color 0.2s ease", // Smooth transition for popping and color change
          transform: clicked ? "scale(1.1)" : "scale(1)", // Temporary pop effect when clicked
          ":hover": {
            backgroundColor: isClicked ? "#071824" : "#335c66", // Slight color change on hover
          },
        }}
      >
        {/* Display Icon when clicked */}
        {icon && (
          <img
            src={
              icon === "bomb"
                ? "https://images-ext-1.discordapp.net/external/oM63MT9lIeRQESWl1VqSrewxe-TtrnmgVgqEizOp12k/https/i.ibb.co/7dmPZB6N/Screenshot-2025-03-29-204021.png?format=webp&quality=lossless&width=284&height=276"
                : "https://images-ext-1.discordapp.net/external/niaCx1l2PpOYRAhNOu6or4qLLsTTyPuuXKQt6OCpqNI/https/i.ibb.co/z9qvxqX/Screenshot-2025-03-29-203955.png?format=webp&quality=lossless&width=299&height=260"
            }
            alt={icon}
            style={{
              width: "60%",
              height: "60%",
              objectFit: "contain",
              zIndex: 2, // Ensure the icon appears above the tile
            }}
          />
        )}
      </Box>
    </div>
  );
};

export default Tile;
