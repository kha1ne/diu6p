import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Anta"].join(","),
  },
});

function CheckboxAssignLeaders({ assignLeaders, handleAssignLeadersChanged }) {
  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Checkbox
            checked={assignLeaders}
            onChange={handleAssignLeadersChanged}
            color="primary"
          />
        }
        label="Randomly Assign Allies' Leaders"
      />
    </ThemeProvider>
  );
}

export default CheckboxAssignLeaders;
