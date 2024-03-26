import React from "react";
import { Button } from "@mui/material";

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
