import { JSX } from 'react';

import { FormControl, MenuItem, Paper, Select, SelectChangeEvent, ThemeProvider, Tooltip, Typography, createTheme } from '@mui/material';

const textTheme = createTheme({
  typography: {
    fontFamily: ['Anta'].join(','),
  },
});

interface DropdownPlayersProps {
  defaultValue: string;
  playersList: string[];
  selectedPlayers: string[];
  dropdownPlayerImages: { image: string; tooltip: string }[];
  handlePlayerSelectionChange: (index: number, value: string) => void;
}

function DropdownPlayers({ defaultValue, playersList, selectedPlayers, dropdownPlayerImages, handlePlayerSelectionChange }: DropdownPlayersProps) {
  const combinedWidthPercentage = 55;

  const renderPlayerDropdown = (startIndex: number): JSX.Element[] =>
    selectedPlayers.slice(startIndex, startIndex + 3).map((player: string, index: number) => (
      <div
        key={startIndex + index}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: startIndex + index === 2 ? '0' : '15px',
          marginTop: startIndex + index === 0 ? '0' : '15px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: `${combinedWidthPercentage}vmin`,
          }}
        >
          <Tooltip title={dropdownPlayerImages[startIndex + index].tooltip} enterTouchDelay={0} arrow>
            <img
              src={dropdownPlayerImages[startIndex + index].image}
              alt={`Player ${startIndex + index + 1}`}
              style={{
                marginRight: '10px',
                width: 'auto',
                height: '54px',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
          <FormControl fullWidth style={{ flex: 1 }}>
            <Select
              value={player}
              onChange={(e: SelectChangeEvent<string>) => handlePlayerSelectionChange(startIndex + index, e.target.value as string)}
              style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              <MenuItem value={defaultValue} disabled>
                Select player
              </MenuItem>
              {playersList.map((option: string, i: number) => (
                <MenuItem key={i} value={option} disabled={selectedPlayers.includes(option) && option !== player}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper
        elevation={3}
        style={{
          border: '1px solid white',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: 'transparent',
        }}
      >
        <ThemeProvider theme={textTheme}>
          <Typography
            variant='h6'
            gutterBottom
            style={{
              color: 'white',
              marginBottom: '15px',
              textAlign: 'left',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Team Paul
          </Typography>
        </ThemeProvider>
        {renderPlayerDropdown(0)}
      </Paper>

      <Paper
        elevation={3}
        style={{
          border: '1px solid white',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: 'transparent',
        }}
      >
        <ThemeProvider theme={textTheme}>
          <Typography
            variant='h6'
            gutterBottom
            style={{
              color: 'white',
              marginBottom: '15px',
              textAlign: 'left',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Team Emperor
          </Typography>
        </ThemeProvider>
        {renderPlayerDropdown(3)}
      </Paper>
    </div>
  );
}

export default DropdownPlayers;
