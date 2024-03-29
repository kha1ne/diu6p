import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import ButtonCreateTable from './ButtonCreateTable';
import CheckboxAssignLeaders from './CheckboxAssignLeaders';
import DropdownPlayers from './DropdownPlayers';
import './App.css';

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
    console.log('Table created!');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <DropdownPlayers
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
