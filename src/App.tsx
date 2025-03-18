import React, { useEffect, useState } from 'react';

import { Grid2 as Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import ButtonCreateTable from './ButtonCreateTable';
import { CheckboxAuthenticStoryExperience, CheckboxUseOnlyBloodlines, LeaderAssignment } from './CheckboxLeaders';
import { DefaultTheme, Leaders, Players } from './Constants';
import DropdownPlayers from './DropdownPlayers';
import sfxDramatic from './assets/sfx/dramatic.mp3';

function App() {
  const [selectedPlayerOptions, setSelectedPlayerOptions] = useState(Array(6).fill(Players.defaultDropdownValue));
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

  const [leaderAssignment, setLeaderAssignment] = useState<'none' | 'random' | 'draft'>('none');

  const handleLeaderAssignmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'none' | 'random' | 'draft';
    setLeaderAssignment(value);
    if (value === 'draft' || value === 'none') {
      setUseOnlyBloodlines(false);
      setAuthenticStoryExperience(false);
    }
  };

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
    <T>(_array: T[]): void;
  }

  const shuffleArray: ShuffleArray = array => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const [draftPool, setDraftPool] = useState<Array<(typeof Leaders.allies)[keyof typeof Leaders.allies]>>([]);

  const handleCreateTableButtonClick = () => {
    const shuffledSelectedPlayerOptions = [...selectedPlayerOptions];
    shuffleArray(shuffledSelectedPlayerOptions);
    setSelectedPlayerOptions(shuffledSelectedPlayerOptions);

    const allAlliedLeaderImages = Object.values(Leaders.allies);
    let filteredAlliedLeaderImages = useOnlyBloodlines
      ? allAlliedLeaderImages.filter(leader => leader.expansion === 'Bloodlines')
      : allAlliedLeaderImages;

    if (leaderAssignment === 'draft') {
      const poolSize = 10;
      const randomPool = getRandomElements(filteredAlliedLeaderImages, poolSize);
      setDraftPool(randomPool);
    } else {
      setDraftPool([]);
    }

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
        if (leaderAssignment === 'random' && filteredAlliedLeaderImages.length > 0) {
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
            <Grid container direction='column' spacing={0} alignItems='left' justifyContent='center'>
              <Grid>
                <LeaderAssignment value={leaderAssignment} onChange={handleLeaderAssignmentChange} />
              </Grid>
              <Grid>
                <CheckboxUseOnlyBloodlines
                  checked={useOnlyBloodlines}
                  onChange={handleUseOnlyBloodlinesChange}
                  disabled={leaderAssignment !== 'random'}
                />
              </Grid>
              <Grid>
                <CheckboxAuthenticStoryExperience
                  checked={authenticStoryExperience}
                  onChange={handleAuthenticStoryExperienceChange}
                  disabled={leaderAssignment !== 'random'}
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
              {leaderAssignment === 'draft' && draftPool.length > 0 && (
                <Grid
                  container
                  sx={{
                    mt: 0,
                    width: '430px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      mb: 0.5,
                      justifyContent: 'center',
                      maxWidth: '430px',
                    }}
                  >
                    {draftPool.slice(0, 5).map((leader, index) => (
                      <Grid key={index} data-testid={`draft-pool-item-${index}`}>
                        <img
                          src={leader.image}
                          alt={leader.tooltip}
                          title={leader.tooltip}
                          style={{
                            width: '56px',
                            height: '56px',
                            border: '2px solid #fff',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      justifyContent: 'center',
                      maxWidth: '430px',
                    }}
                  >
                    {draftPool.slice(5, 10).map((leader, index) => (
                      <Grid key={index + 5} data-testid={`draft-pool-item-${index}`}>
                        <img
                          src={leader.image}
                          alt={leader.tooltip}
                          title={leader.tooltip}
                          style={{
                            width: '56px',
                            height: '56px',
                            border: '2px solid #fff',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
