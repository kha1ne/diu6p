import React from 'react';

import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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
    MuiRadio: {
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

interface LeaderAssignmentProps {
  value: 'none' | 'random' | 'draft';
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LeaderAssignment({ value, onChange }: LeaderAssignmentProps) {
  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <RadioGroup value={value} onChange={onChange} row>
          <FormControlLabel value='none' control={<Radio color='primary' />} label='No Selection' />
          <FormControlLabel value='random' control={<Radio color='primary' />} label='Random Assignment' />
          <FormControlLabel value='draft' control={<Radio color='primary' />} label='Draft Pool' />
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
}

interface CheckboxUseOnlyBloodlinesProps {
  checked: boolean;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
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
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
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
