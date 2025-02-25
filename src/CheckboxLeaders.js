import { Checkbox, FormControlLabel } from '@mui/material';
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

export function CheckboxAssignLeaders({ checked, onChange }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={onChange} color="primary" />
          }
          label="Assign Random Allies"
        />
      </div>
    </ThemeProvider>
  );
}

export function CheckboxUseOnlyBloodlines({ checked, onChange, disabled }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              color="primary"
              disabled={disabled}
            />
          }
          label="Use Bloodlines Leaders"
        />
      </div>
    </ThemeProvider>
  );
}

export function CheckboxAuthenticStoryExperience({
  checked,
  onChange,
  disabled
}) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              color="primary"
              disabled={disabled}
            />
          }
          label="Authentic Story Experience"
        />
      </div>
    </ThemeProvider>
  );
}
