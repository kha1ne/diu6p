import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function CheckboxAssignLeaders({ checked, onChange }) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      }
      label="Randomly Assign Allies' Leaders"
    />
  );
}

export default CheckboxAssignLeaders;
