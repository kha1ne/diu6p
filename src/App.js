import { Grid2 as Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import './App.css';

import ButtonCreateTable from './ButtonCreateTable';
import {
  CheckboxAssignLeaders,
  CheckboxAuthenticStoryExperience,
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
  const [authenticStoryExperience, setAuthenticStoryExperience] =
    useState(false);
  const [playerImageOptions, setPlayerImageOptions] = useState(
    Array(6).fill({
      image: Leaders.unknown.Questionmark.image,
      tooltip: Leaders.unknown.Questionmark.tooltip
    })
  );
  const [audioDramatic, setAudioDramatic] = useState(null);

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
      setAuthenticStoryExperience(false);
    }
  };

  const handleUseOnlyBloodlinesChange = event => {
    setUseOnlyBloodlines(event.target.checked);
  };

  const handleAuthenticStoryExperienceChange = event => {
    setAuthenticStoryExperience(event.target.checked);
  };

  const getRandomElements = (array, count) => {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const shuffleArray = array => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleCreateTableButtonClick = () => {
    const shuffledSelectedPlayerOptions = [...selectedPlayerOptions];
    shuffleArray(shuffledSelectedPlayerOptions);
    setSelectedPlayerOptions(shuffledSelectedPlayerOptions);

    const updatedPlayerImageOptions = [...playerImageOptions];

    updatedPlayerImageOptions[0] = Leaders.commanders['Paul'];
    updatedPlayerImageOptions[3] = Leaders.commanders['Shaddam'];

    const allAlliedLeaderImages = Object.values(Leaders.allies);
    let filteredAlliedLeaderImages = useOnlyBloodlines
      ? allAlliedLeaderImages.filter(
          leader => leader.expansion === 'Bloodlines'
        )
      : allAlliedLeaderImages;

    if (authenticStoryExperience) {
      const paulAllies = getRandomElements(
        filteredAlliedLeaderImages.filter(
          leader =>
            leader.alignment === 'Atreides' || leader.alignment === 'Neutral'
        ),
        2
      );

      const shaddamAllies = getRandomElements(
        filteredAlliedLeaderImages.filter(
          leader =>
            (leader.alignment === 'Corrino' ||
              leader.alignment === 'Neutral') &&
            !paulAllies.includes(leader)
        ),
        2
      );

      filteredAlliedLeaderImages = [...paulAllies, ...shaddamAllies].reverse();
    } else {
      shuffleArray(filteredAlliedLeaderImages);
    }

    for (let i = 1; i < updatedPlayerImageOptions.length; i++) {
      if (i !== 0 && i !== 3) {
        updatedPlayerImageOptions[i] = shouldAssignRandomLeaders
          ? filteredAlliedLeaderImages.pop()
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
  };

  const isAnyPlayerNotSelected = selectedPlayerOptions.some(
    player => player === Players.defaultDropdownValue
  );

  const theme = createTheme(DefaultTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container justifyContent="center">
          <Grid>
            <DropdownPlayers
              defaultValue={Players.defaultDropdownValue}
              playersList={Players.list}
              selectedPlayers={selectedPlayerOptions}
              dropdownPlayerImages={playerImageOptions}
              handlePlayerSelectionChange={handlePlayerSelectionChange}
            />
            <Grid
              container
              direction="column"
              spacing={1}
              alignItems="left"
              justifyContent="center"
            >
              <Grid>
                <CheckboxAssignLeaders
                  checked={shouldAssignRandomLeaders}
                  onChange={handleLeadershipAssignmentChange}
                />
              </Grid>
              <Grid>
                <CheckboxUseOnlyBloodlines
                  checked={useOnlyBloodlines}
                  onChange={handleUseOnlyBloodlinesChange}
                  disabled={!shouldAssignRandomLeaders}
                />
              </Grid>
              <Grid>
                <CheckboxAuthenticStoryExperience
                  checked={authenticStoryExperience}
                  onChange={handleAuthenticStoryExperienceChange}
                  disabled={!shouldAssignRandomLeaders}
                />
              </Grid>
            </Grid>
            <Grid>
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
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
