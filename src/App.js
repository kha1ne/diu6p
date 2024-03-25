import React, { useState } from "react";
import { Grid } from "@mui/material";
import DropdownPlayers from "./DropdownPlayers";
import "./App.css";

function App() {
  const playersList = [
    "Babba",
    "Bata",
    "Damjan",
    "Gogi",
    "Iki",
    "Mare",
    "Neša",
    "Peki",
    "Robi",
    "Šilja",
  ];

  const [selectedPlayers, setSelectedPlayers] = useState(
    Array(6).fill("Select player")
  );

  const handleDropdownChange = (index, value) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = value;
    setSelectedPlayers(updatedPlayers);
  };

  return (
    <div className="App">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <DropdownPlayers
            playersList={playersList}
            selectedPlayers={selectedPlayers}
            handleDropdownChange={handleDropdownChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
