import React, { useState } from "react";
import { Select, MenuItem, FormControl, Grid } from "@mui/material";
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
          <div className="dropdowns">
            {selectedPlayers.map((player, index) => (
              <FormControl fullWidth>
                <Select
                  key={index}
                  value={player}
                  onChange={(e) => handleDropdownChange(index, e.target.value)}
                  displayEmpty
                  style={{ minWidth: "200px", marginBottom: "20px" }}
                >
                  <MenuItem value="Select player" disabled>
                    Select player
                  </MenuItem>
                  {playersList.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
