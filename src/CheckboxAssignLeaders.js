import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    }
  },
  typography: {
    fontFamily: ['Anta'].join(','),
    body1: {
      color: '#ffffff'
    }
  }
});
function CheckboxAssignLeaders({ checked, onChange }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={onChange} color="primary" />
          }
          label="Assign random leaders to allies"
        />
      </div>
    </ThemeProvider>
  );
}

export default CheckboxAssignLeaders;
