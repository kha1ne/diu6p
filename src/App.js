import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

import ButtonCreateTable from './ButtonCreateTable';
import CheckboxAssignLeaders from './CheckboxAssignLeaders';
import DropdownPlayers from './DropdownPlayers';

import {
  playersList,
  dropdownDefaultValue,
  leaderImagesLookup,
  defaultTheme
} from './Constants';

import sfxDramatic from './sfx/dramatic.mp3';

function App() {
  const [selectedPlayers, setSelectedPlayers] = useState(
    Array(6).fill(dropdownDefaultValue)
  );
  const [randomAssignLeaders, setRandomAssignLeaders] = useState(false);
  const [dropdownPlayerImages, setDropdownPlayerImages] = useState(
    Array(6).fill({
      image: leaderImagesLookup.unknown.Questionmarko.image,
      tooltip: leaderImagesLookup.unknown.Questionmarko.tooltip
    })
  );

  useEffect(() => {
    const audio = new Audio(sfxDramatic);
    audio.preload = 'auto';
    setAudioDramatic(audio);
  }, []);

  const handleDropdownChange = (index, value) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = value;
    setSelectedPlayers(updatedPlayers);
  };

  const handleAssignLeadersChanged = event => {
    setRandomAssignLeaders(event.target.checked);
  };

  const [audioDramatic, setAudioDramatic] = useState(null);

  const handleCreateTableClicked = () => {
    const shuffledPlayers = selectedPlayers
      .slice()
      .sort(() => Math.random() - 0.5);

    setSelectedPlayers(shuffledPlayers);

    dropdownPlayerImages[0] = {
      image: leaderImagesLookup.commanders['Paul'].image,
      tooltip: leaderImagesLookup.commanders['Paul'].tooltip
    };
    dropdownPlayerImages[3] = {
      image: leaderImagesLookup.commanders['Shadam'].image,
      tooltip: leaderImagesLookup.commanders['Shadam'].tooltip
    };

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
        if (randomAssignLeaders) {
          dropdownPlayerImages[i] = alliedLeaders.pop();
        } else {
          dropdownPlayerImages[i] = {
            image: leaderImagesLookup.unknown.Questionmark.image,
            tooltip: leaderImagesLookup.unknown.Questionmark.tooltip
          };
        }
      }
    }

    setDropdownPlayerImages([...dropdownPlayerImages]);

    if (audioDramatic) audioDramatic.play();

    console.log('Table created!');
  };

  const isAnyPlayerNotSelected = selectedPlayers.some(
    player => player === dropdownDefaultValue
  );

  const theme = createTheme(defaultTheme);

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
