import React from "react";
import { Button } from "@mui/material";

function ButtonCreateTable({ handleCreateTableClicked }) {
  return (
    <Button variant="contained" onClick={handleCreateTableClicked}>
      Create Table
    </Button>
  );
}

export default ButtonCreateTable;
