import React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Anta'].join(','),
    body1: {
      color: '#ffffff',
    },
  },
});

interface CheckboxAssignLeadersProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckboxAssignLeaders({ checked, onChange }: CheckboxAssignLeadersProps) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} color='primary' />} label='Assign Random Allies' />
      </div>
    </ThemeProvider>
  );
}

interface CheckboxUseOnlyBloodlinesProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function CheckboxUseOnlyBloodlines({ checked, onChange, disabled }: CheckboxUseOnlyBloodlinesProps) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} color='primary' disabled={disabled} />}
          label='Use Bloodlines Leaders'
        />
      </div>
    </ThemeProvider>
  );
}

interface CheckboxAuthenticStoryExperienceProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function CheckboxAuthenticStoryExperience({ checked, onChange, disabled }: CheckboxAuthenticStoryExperienceProps) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} color='primary' disabled={disabled} />}
          label='Authentic Story Experience'
        />
      </div>
    </ThemeProvider>
  );
}
