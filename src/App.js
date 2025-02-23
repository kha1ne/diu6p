import { Grid2 as Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import './App.css';

import ButtonCreateTable from './ButtonCreateTable';
import {
  CheckboxAssignLeaders,
  CheckboxUseOnlyBloodlines
} from './CheckboxLeaders';
import DropdownPlayers from './DropdownPlayers';

import { DefaultTheme, Leaders, Players } from './Constants';

import sfxDramatic from './sfx/dramatic.mp3';

function App() {
  const [selectedPlayerOptions, setSelectedPlayerOptions] = useState(
    Array(6).fill(Players.defaultDropdownValue)
  );
  const [shouldAssignRandomLeaders, setShouldAssignRandomLeaders] =
    useState(false);
  const [useOnlyBloodlines, setUseOnlyBloodlines] = useState(false);
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
    if (!event.target.checked) {
      setUseOnlyBloodlines(false);
    }
  };

  const handleUseOnlyBloodlinesChange = event => {
    setUseOnlyBloodlines(event.target.checked);
  };

  const [audioDramatic, setAudioDramatic] = useState(null);

  const handleCreateTableButtonClick = () => {
    const shuffledSelectedPlayerOptions = selectedPlayerOptions
      .slice()
      .sort(() => Math.random() - 0.5);
    setSelectedPlayerOptions(shuffledSelectedPlayerOptions);

    const updatedPlayerImageOptions = [...playerImageOptions];

    updatedPlayerImageOptions[0] = Leaders.commanders['Paul'];
    updatedPlayerImageOptions[3] = Leaders.commanders['Shaddam'];

    const allAlliedLeaderImages = Object.values(Leaders.allies);
    const filteredAlliedLeaderImages = useOnlyBloodlines
      ? allAlliedLeaderImages.filter(
          leader => leader.expansion === 'Bloodlines'
        )
      : allAlliedLeaderImages;

    const shuffledAlliedLeaderImages = filteredAlliedLeaderImages
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
          <Grid xs={12} sm={8}>
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
            <CheckboxUseOnlyBloodlines
              checked={useOnlyBloodlines}
              onChange={handleUseOnlyBloodlinesChange}
              disabled={!shouldAssignRandomLeaders}
            />
            <div className="button-container">
              <ButtonCreateTable
                disabled={isAnyPlayerNotSelected}
                onClick={handleCreateTableButtonClick}
                label="Create Table"
                variant="contained"
                color="primary"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
