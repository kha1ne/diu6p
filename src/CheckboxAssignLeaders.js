import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

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
