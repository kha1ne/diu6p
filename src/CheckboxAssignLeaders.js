import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function CheckboxAssignLeaders({ assignLeaders, handleAssignLeadersChanged }) {
  return (
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
  );
}

export default CheckboxAssignLeaders;
