import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
    setDrawerOpen(false);
  };

  const isCurrentPage = (path) => location.pathname === path;

  return (
    <>
   
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#333",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/")}
          >
            TMDB Client
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {menuOptions.map((opt) => (
              <Button
                key={opt.label}
                onClick={() => handleMenuSelect(opt.path)}
                sx={{
                  color: "white",
                  border: "1px solid white",
                  margin: "0 5px",
                  ...(isCurrentPage(opt.path) && {
                    backgroundColor: "#555",
                    color: "white",
                  }),
                }}
              >
                {opt.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: 250,
          backgroundColor: "#E4E4DE",
        }}
      >
        <List>
          {menuOptions.map((opt) => (
            <ListItem
              button
              key={opt.label}
              onClick={() => handleMenuSelect(opt.path)}
              sx={{
                backgroundColor: isCurrentPage(opt.path) ? "#C4C5BA" : "transparent",
                borderLeft: isCurrentPage(opt.path) ? "4px solid #595f39" : "none",
              }}
            >
              <ListItemText primary={opt.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SiteHeader;
