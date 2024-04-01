import { Button } from '@mui/material';
import React from 'react';

function ButtonCreateTable({ disabled, onClick }) {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      Create Table
    </Button>
  );
}

export default ButtonCreateTable;
