import {
  makeStyles,
  useTheme,
  BottomNavigation,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  CardActions,
} from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StarIcon from "@material-ui/icons/Star";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { fetchData, fetchRepos } from "../api/GithubApi";
import { searchContext } from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 170,
    height: 170,
  },
  controls: {
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(360deg)",
  },
}));

const Body = () => {
  const search = useContext(searchContext);
  const classes = useStyles();
  const [value, setValue] = useState();
  const [expanded, setExpanded] = useState();
  const [data, setData] = useState([]);
  const [repo, setRepo] = useState([]);
  useEffect(() => {
    const delay = setTimeout(() => {
      const repos = async () => {
        const repo = await fetchRepos(search);
        setRepo(repo);
      };
      repos();
    }, 1000);
    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const dataF = async () => {
        const datas = await fetchData(search);
        setData(datas);
      };
      dataF();
    }, 1000);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {data.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              @{data.login}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <CardActions>
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels
                style={{ width: "200px" }}
              >
                <BottomNavigationAction
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={(event, repos = "repos") => {
                    setExpanded(repos);
                  }}
                  aria-expanded={expanded}
                  label="Repos"
                  icon={<MenuBookIcon />}
                />

                <BottomNavigationAction
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={(event, repos = "star") => {
                    setExpanded(repos);
                  }}
                  aria-expanded={expanded}
                  label="Stars"
                  icon = {<StarIcon />}
                />
                  
                
                <BottomNavigationAction
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={(event, repos = "events") => {
                    setExpanded(repos);
                  }}
                  aria-expanded={expanded}
                  label="Events"
                  icon={<EventAvailableIcon />}
                />
                  
              </BottomNavigation>
            </CardActions>
            <Collapse in={expanded === "repos"} timeout="auto" unmountOnExit>
              <CardContent>
                {repo.map((r) => (
                  <Typography paragraph>
                    <a href={r.html_url}>Repo Name : {r.name}</a>
                    <br />
                    created_at : {r.created_at}
                    <br />
                    updated_at : {r.updated_at}
                    <br />
                    pushed_at : {r.pushed_at}
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
            <Collapse in={expanded === "events"} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
              </CardContent>
            </Collapse>
            <Collapse in={expanded === "star"} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
              </CardContent>
            </Collapse>
          </div>
        </div>
        <CardMedia className={classes.cover} image={data.avatar_url} />
      </Card>
    </div>
  );
};

export default Body;
