import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./DropdownPlayers.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Anta"].join(","),
  },
});

function DropdownPlayers({
  playersList,
  selectedPlayers,
  handleDropdownChange,
}) {
  return (
    <ThemeProvider theme={theme}>
      <div className="dropdowns">
        {selectedPlayers.map((player, index) => (
          <FormControl key={index} fullWidth>
            <Select
              value={player}
              onChange={(e) => {
                return handleDropdownChange(index, e.target.value);
              }}
              displayEmpty
              style={{
                width: "300px",
                marginBottom: "20px",
              }}
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
    </ThemeProvider>
  );
}

export default DropdownPlayers;
