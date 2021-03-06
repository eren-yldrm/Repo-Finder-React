import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  alpha,
  makeStyles,
  Grid,
} from "@material-ui/core/";
import Body from "./Body";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 0.5,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "22ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));
export const searchContext = React.createContext();
export const Header = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("eren-yldrm");

  const handleSearch = (search) => {
    setSearch(search);
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: "url(/img/header.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Github Finder
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Kullan??c?? Ad?? Ara"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <searchContext.Provider value={search}>
            <Body />
          </searchContext.Provider>
        </Grid>
      </Grid>
    </div>
  );
};
