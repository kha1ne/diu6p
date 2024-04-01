import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import './App.css';
import ButtonCreateTable from './ButtonCreateTable';
import CheckboxAssignLeaders from './CheckboxAssignLeaders';
import DropdownPlayers from './DropdownPlayers';
import questionmark from './img/questionmark.png';
import {
  playersList,
  dropdownDefaultValue,
  leaderImagesLookup,
  defaultTheme
} from './Constants';

function App() {
  const theme = createTheme(defaultTheme);
  const [selectedPlayers, setSelectedPlayers] = useState(
    Array(6).fill(dropdownDefaultValue)
  );
  const [randomAssignLeaders, setRandomAssignLeaders] = useState(false);
  const [dropdownPlayerImages, setDropdownPlayerImages] = useState(
    Array(6).fill(questionmark)
  );

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

    dropdownPlayerImages[0] = leaderImagesLookup.commanders['Paul'];
    dropdownPlayerImages[3] = leaderImagesLookup.commanders['Shadam'];

    const alliedLeaders = Object.values(leaderImagesLookup.allies).slice();

    for (let i = alliedLeaders.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alliedLeaders[i], alliedLeaders[j]] = [
        alliedLeaders[j],
        alliedLeaders[i]
      ];
    }

    for (let i = 1; i < dropdownPlayerImages.length; i++) {
      if (i !== 0 && i !== 3) {
        if (randomAssignLeaders) dropdownPlayerImages[i] = alliedLeaders.pop();
        else dropdownPlayerImages[i] = questionmark;
      }
    }

    setDropdownPlayerImages([...dropdownPlayerImages]);
    console.log('Table created!');
  };

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
              dropdownPlayerImages={dropdownPlayerImages}
              handleDropdownChange={handleDropdownChange}
            />
            <CheckboxAssignLeaders
              checked={randomAssignLeaders}
              onChange={handleAssignLeadersChanged}
            />
            <div className="button-container">
              <ButtonCreateTable
                disabled={isAnyPlayerNotSelected}
                onClick={handleCreateTableClicked}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
