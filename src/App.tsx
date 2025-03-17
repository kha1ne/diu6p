import { useEffect, useState } from 'react';

import { Grid2 as Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import ButtonCreateTable from './ButtonCreateTable';
import { CheckboxAssignLeaders, CheckboxAuthenticStoryExperience, CheckboxUseOnlyBloodlines } from './CheckboxLeaders';
import { DefaultTheme, Leaders, Players } from './Constants';
import DropdownPlayers from './DropdownPlayers';
import sfxDramatic from './assets/sfx/dramatic.mp3';

function App() {
  const [selectedPlayerOptions, setSelectedPlayerOptions] = useState(Array(6).fill(Players.defaultDropdownValue));
  const [shouldAssignRandomLeaders, setShouldAssignRandomLeaders] = useState(false);
  const [useOnlyBloodlines, setUseOnlyBloodlines] = useState(false);
  const [authenticStoryExperience, setAuthenticStoryExperience] = useState(false);
  const [playerImageOptions, setPlayerImageOptions] = useState(
    Array(6).fill({
      image: Leaders.unknown.Questionmark.image,
      tooltip: Leaders.unknown.Questionmark.tooltip,
    })
  );
  const [audioDramatic, setAudioDramatic] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(sfxDramatic);
    audio.preload = 'auto';
    setAudioDramatic(audio);
  }, []);

  const handlePlayerSelectionChange = (index: number, value: string) => {
    if (!Number.isSafeInteger(index) || index < 0 || index >= selectedPlayerOptions.length) {
      return;
    }

    if (!Players.list.includes(value) && value !== Players.defaultDropdownValue) {
      return;
    }

    setSelectedPlayerOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  interface LeadershipAssignmentChangeEvent {
    target: {
      checked: boolean;
    };
  }

  const handleLeadershipAssignmentChange = (event: LeadershipAssignmentChangeEvent) => {
    setShouldAssignRandomLeaders(event.target.checked);
    if (!event.target.checked) {
      setUseOnlyBloodlines(false);
      setAuthenticStoryExperience(false);
    }
  };

  interface UseOnlyBloodlinesChangeEvent {
    target: {
      checked: boolean;
    };
  }

  const handleUseOnlyBloodlinesChange = (event: UseOnlyBloodlinesChangeEvent) => {
    setUseOnlyBloodlines(event.target.checked);
  };

  interface AuthenticStoryExperienceChangeEvent {
    target: {
      checked: boolean;
    };
  }

  const handleAuthenticStoryExperienceChange = (event: AuthenticStoryExperienceChangeEvent) => {
    setAuthenticStoryExperience(event.target.checked);
  };

  interface GetRandomElements {
    <T>(_array: T[], _count: number): T[];
  }

  const getRandomElements: GetRandomElements = (array, count) => {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  interface ShuffleArray {
    <T>(array: T[]): void;
  }

  const shuffleArray: ShuffleArray = array => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleCreateTableButtonClick = () => {
    const shuffledSelectedPlayerOptions = [...selectedPlayerOptions];
    shuffleArray(shuffledSelectedPlayerOptions);
    setSelectedPlayerOptions(shuffledSelectedPlayerOptions);

    const allAlliedLeaderImages = Object.values(Leaders.allies);
    let filteredAlliedLeaderImages = useOnlyBloodlines
      ? allAlliedLeaderImages.filter(leader => leader.expansion === 'Bloodlines')
      : allAlliedLeaderImages;

    if (authenticStoryExperience) {
      const paulAllies = getRandomElements(
        filteredAlliedLeaderImages.filter(leader => leader.alignment === 'Atreides' || leader.alignment === 'Neutral'),
        2
      );

      const shaddamAllies = getRandomElements(
        filteredAlliedLeaderImages.filter(
          leader => (leader.alignment === 'Corrino' || leader.alignment === 'Neutral') && !paulAllies.includes(leader)
        ),
        2
      );

      filteredAlliedLeaderImages = [...paulAllies, ...shaddamAllies].reverse();
    } else {
      shuffleArray(filteredAlliedLeaderImages);
    }

    const validIndices = [0, 1, 2, 3, 4, 5];
    const newPlayerImageOptions = validIndices.map(index => {
      if (index === 0) return Leaders.commanders['Paul'];
      if (index === 3) return Leaders.commanders['Shaddam'];

      if (index !== 0 && index !== 3) {
        if (shouldAssignRandomLeaders && filteredAlliedLeaderImages.length > 0) {
          return filteredAlliedLeaderImages.pop();
        }
        return {
          image: Leaders.unknown.Questionmark.image,
          tooltip: Leaders.unknown.Questionmark.tooltip,
        };
      }

      return playerImageOptions[index];
    });

    setPlayerImageOptions(newPlayerImageOptions);
    audioDramatic?.play();
  };

  const isAnyPlayerNotSelected = selectedPlayerOptions.some(player => player === Players.defaultDropdownValue);

  const theme = createTheme(DefaultTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Grid container justifyContent='center'>
          <Grid>
            <DropdownPlayers
              defaultValue={Players.defaultDropdownValue}
              playersList={Players.list}
              selectedPlayers={selectedPlayerOptions}
              dropdownPlayerImages={playerImageOptions}
              handlePlayerSelectionChange={handlePlayerSelectionChange}
            />
            <Grid container direction='column' spacing={1} alignItems='left' justifyContent='center'>
              <Grid>
                <CheckboxAssignLeaders checked={shouldAssignRandomLeaders} onChange={handleLeadershipAssignmentChange} />
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
              <div className='button-container'>
                <ButtonCreateTable
                  disabled={isAnyPlayerNotSelected}
                  onClick={handleCreateTableButtonClick}
                  label='Create Table'
                  variant='contained'
                  color='primary'
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
