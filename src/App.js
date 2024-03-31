import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import './App.css';
import ButtonCreateTable from './ButtonCreateTable';
import CheckboxAssignLeaders from './CheckboxAssignLeaders';
import DropdownPlayers from './DropdownPlayers';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Anta'].join(',')
    }
  });

  const playersList = [
    'Babba',
    'Bata',
    'Damjan',
    'Gogi',
    'Iki',
    'Mare',
    'Neša',
    'Peki',
    'Robi',
    'Šilja'
  ];

  const dropdownDefaultValue = 'Select player';

  const [selectedPlayers, setSelectedPlayers] = useState(
    Array(6).fill('Select player')
  );

  const [randomAssignLeaders, setRandomAssignLeaders] = useState(false);

  const handleDropdownChange = (index, value) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = value;
    setSelectedPlayers(updatedPlayers);
  };

  const handleAssignLeadersChanged = event => {
    setRandomAssignLeaders(event.target.checked);
  };

  const handleCreateTableClicked = () => {
    const shuffledPlayers = selectedPlayers
      .slice()
      .sort(() => Math.random() - 0.5);
    setSelectedPlayers(shuffledPlayers);
    console.log('Table created!');
  };

  // Check if any of the selected players are still 'Select player'
  const isAnyPlayerNotSelected = selectedPlayers.some(
    player => player === dropdownDefaultValue
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <DropdownPlayers
              defaultValue={dropdownDefaultValue}
              playersList={playersList}
              selectedPlayers={selectedPlayers}
              handleDropdownChange={handleDropdownChange}
            />
            <CheckboxAssignLeaders
              randomAssignLeaders={randomAssignLeaders}
              handleAssignLeadersChanged={handleAssignLeadersChanged}
            />
            <div className="button-container">
              <ButtonCreateTable
                disabled={isAnyPlayerNotSelected}
                handleCreateTableClicked={handleCreateTableClicked}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
