import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Todo List</Typography>
        <Typography variant="body2">Gor Arestakesyan</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
