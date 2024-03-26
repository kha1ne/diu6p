import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

function DropdownPlayers({
  playersList,
  selectedPlayers,
  handleDropdownChange,
}) {
  return (
    <div>
      {selectedPlayers.map((player, index) => (
        <FormControl key={index} fullWidth>
          <Select
            value={player}
            onChange={(e) => {
              return handleDropdownChange(index, e.target.value);
            }}
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "15px",
              width: "45vmin",
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
  );
}

export default DropdownPlayers;
