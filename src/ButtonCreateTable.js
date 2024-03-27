import { Button } from '@mui/material';
import React from 'react';

function ButtonCreateTable({ handleCreateTableClicked }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateTableClicked}
    >
      Create Table
    </Button>
  );
}

export default ButtonCreateTable;
