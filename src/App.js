import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

import ButtonCreateTable from './ButtonCreateTable';
import CheckboxAssignLeaders from './CheckboxAssignLeaders';
import DropdownPlayers from './DropdownPlayers';

import { Players, Leaders, DefaultTheme } from './Constants';

import sfxDramatic from './sfx/dramatic.mp3';

function App() {
  const [selectedPlayerOptions, setSelectedPlayerOptions] = useState(
    Array(6).fill(Players.defaultDropdownValue)
  );
  const [shouldAssignRandomLeaders, setShouldAssignRandomLeaders] =
    useState(false);
  const [playerImageOptions, setPlayerImageOptions] = useState(
    Array(6).fill({
      image: Leaders.unknown.Questionmark.image,
      tooltip: Leaders.unknown.Questionmark.tooltip
    })
  );

  useEffect(() => {
    const audio = new Audio(sfxDramatic);
    audio.preload = 'auto';
    setAudioDramatic(audio);
  }, []);

  const handlePlayerSelectionChange = (index, value) => {
    const updatedSelectedPlayerOptions = [...selectedPlayerOptions];
    updatedSelectedPlayerOptions[index] = value;
    setSelectedPlayerOptions(updatedSelectedPlayerOptions);
  };

  const handleLeadershipAssignmentChange = event => {
    setShouldAssignRandomLeaders(event.target.checked);
  };

  const [audioDramatic, setAudioDramatic] = useState(null);

  const handleCreateTableButtonClick = () => {
    const shuffledSelectedPlayerOptions = selectedPlayerOptions
      .slice()
      .sort(() => Math.random() - 0.5);
    setSelectedPlayerOptions(shuffledSelectedPlayerOptions);

    const updatedPlayerImageOptions = [...playerImageOptions];

    updatedPlayerImageOptions[0] = Leaders.commanders['Paul'];
    updatedPlayerImageOptions[3] = Leaders.commanders['Shadam'];

    const shuffledAlliedLeaderImages = Object.values(Leaders.allies)
      .slice()
      .sort(() => Math.random() - 0.5);

    for (let i = 1; i < updatedPlayerImageOptions.length; i++) {
      if (i !== 0 && i !== 3) {
        updatedPlayerImageOptions[i] = shouldAssignRandomLeaders
          ? shuffledAlliedLeaderImages.pop()
          : {
              image: Leaders.unknown.Questionmark.image,
              tooltip: Leaders.unknown.Questionmark.tooltip
            };
      }
    }

    setPlayerImageOptions(updatedPlayerImageOptions);

    if (audioDramatic) {
      audioDramatic.complete();
      audioDramatic.play();
    }

    console.log('Table created!');
  };

  const isAnyPlayerNotSelected = selectedPlayerOptions.some(
    player => player === Players.defaultDropdownValue
  );

  const theme = createTheme(DefaultTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <DropdownPlayers
              defaultValue={Players.defaultDropdownValue}
              playersList={Players.list}
              selectedPlayers={selectedPlayerOptions}
              dropdownPlayerImages={playerImageOptions}
              handlePlayerSelectionChange={handlePlayerSelectionChange}
            />
            <CheckboxAssignLeaders
              checked={shouldAssignRandomLeaders}
              onChange={handleLeadershipAssignmentChange}
            />
            <div className="button-container">
              <ButtonCreateTable
                disabled={isAnyPlayerNotSelected}
                onClick={handleCreateTableButtonClick}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
