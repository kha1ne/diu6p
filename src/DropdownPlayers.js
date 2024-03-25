import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import "./DropdownPlayers.css";

function DropdownPlayers({
  playersList,
  selectedPlayers,
  handleDropdownChange,
}) {
  return (
    <div className="dropdowns">
      {selectedPlayers.map((player, index) => (
        <FormControl key={index} fullWidth>
          <Select
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
  );
}

export default DropdownPlayers;
