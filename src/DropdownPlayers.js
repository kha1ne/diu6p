import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';
import questionmark from './img/questionmark.png';

function DropdownPlayers({
  playersList,
  selectedPlayers,
  handleDropdownChange
}) {
  const combinedWidthPercentage = 55;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {selectedPlayers.map((player, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            width: `${combinedWidthPercentage}vmin`,
            justifyContent: 'center'
          }}
        >
          <img
            src={questionmark}
            alt={`Player ${index + 1}`}
            style={{
              marginRight: '10px',
              width: 'auto',
              height: '54'
            }}
          />
          <FormControl fullWidth style={{ flex: 1 }}>
            <Select
              value={player}
              onChange={e => {
                return handleDropdownChange(index, e.target.value);
              }}
            >
              <MenuItem value="Select player" disabled>
                Select player
              </MenuItem>
              {playersList.map((option, i) => (
                <MenuItem
                  key={i}
                  value={option}
                  disabled={
                    selectedPlayers.includes(option) && option !== player
                  }
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ))}
    </div>
  );
}

export default DropdownPlayers;
