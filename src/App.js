import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import './App.css';
import ButtonCreateTable from './ButtonCreateTable';
import CheckboxAssignLeaders from './CheckboxAssignLeaders';
import DropdownPlayers from './DropdownPlayers';
import questionmark from './img/questionmark.png';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Anta'].join(',')
    }
  });

  const commanderLeaderImages = {
    Paul: require('./img/leaders/paul_54x54.png'),
    Shadam: require('./img/leaders/shadam_54x54.png')
  };

  const allyLeaderImages = {
    Amber: require('./img/leaders/amber_54x54.png'),
    Ariana: require('./img/leaders/ariana_54x54.png'),
    Armand: require('./img/leaders/armand_54x54.png'),
    Feyd: require('./img/leaders/feyd_54x54.png'),
    Gourney: require('./img/leaders/gourney_54x54.png'),
    Ilban: require('./img/leaders/ilban_54x54.png'),
    Ilesa: require('./img/leaders/ilesa_54x54.png'),
    Irulan: require('./img/leaders/irulan_54x54.png'),
    Jessica: require('./img/leaders/jessica_54x54.png'),
    Leto: require('./img/leaders/leto_54x54.png'),
    Margo: require('./img/leaders/margo_54x54.png'),
    Memnon: require('./img/leaders/memnon_54x54.png'),
    Raban: require('./img/leaders/raban_54x54.png'),
    Staban: require('./img/leaders/staban_54x54.png'),
    Tessia: require('./img/leaders/tessia_54x54.png'),
    Vladimir: require('./img/leaders/vladimir_54x54.png'),
    Yuna: require('./img/leaders/yuna_54x54.png')
  };

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

    const leaderImages = Array(6).fill(questionmark);

    leaderImages[0] = commanderLeaderImages['Paul'];
    leaderImages[3] = commanderLeaderImages['Shadam'];

    if (randomAssignLeaders) {
      leaderImages.forEach((image, index) => {
        if (index !== 0 && index !== 3) {
          const allyLeaders = Object.keys(allyLeaderImages);
          const randomAllyLeader =
            allyLeaders[Math.floor(Math.random() * allyLeaders.length)];
          leaderImages[index] = allyLeaderImages[randomAllyLeader];
        }
      });
      console.log('Randomizing leaders..');
    }
    setDropdownPlayerImages([...leaderImages]);

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
