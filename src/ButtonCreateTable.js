import { Button } from '@mui/material';
import React from 'react';

function ButtonCreateTable({ disabled, handleCreateTableClicked }) {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={handleCreateTableClicked}
    >
      Create Table
    </Button>
  );
}

export default ButtonCreateTable;
