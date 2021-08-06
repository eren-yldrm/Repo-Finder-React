import {
  makeStyles,
  BottomNavigation,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  CardActions,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StarIcon from "@material-ui/icons/Star";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { fetchData, fetchRepos, fetchFollowers } from "../api/GithubApi";
import { searchContext } from "./Header";
const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: "100%",
    maxWidth: 360,

    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },

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
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const followers = async () => {
        const follower = await fetchFollowers(search);
        setFollower(follower);
      };
      followers();
    }, 1000);
    return () => clearTimeout(delay);
  }, [search]);

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
      <Card
        className={classes.root}
        style={{
          backgroundImage: `url("/img/card.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {data.name}
            </Typography>
            <Typography variant="subtitle1">@{data.login}</Typography>
          </CardContent>
          <div className={classes.controls}>
            <CardActions>
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels
                style={{ width: "230px", backgroundColor: "lightblue" }}
              >
                <BottomNavigationAction
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={(event, repos = "repos") => {
                    setExpanded(repos);
                  }}
                  style={{ color: "black" }}
                  aria-expanded={expanded}
                  label={repo.length + " Repo"}
                  icon={<MenuBookIcon />}
                />

      

                <BottomNavigationAction
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={(event, repos = "follower") => {
                    setExpanded(repos);
                  }}
                  style={{ color: "black" }}
                  aria-expanded={expanded}
                  label={follower.length + " Follower"}
                  icon={<EventAvailableIcon />}
                />
              </BottomNavigation>
            </CardActions>
            <Collapse in={expanded === "repos"} timeout="auto" unmountOnExit>
              <List
                className={classes.listRoot}
                subheader={<li />}
                style={{
                  backgroundColor: "inherit",
                }}
              >
                {repo.map((r) => (
                  <li key={`section-${0}`} className={classes.listSection}>
                    <ul style={{ padding: "0px" }}>
                      <a
                        href={r.html_url}
                        target="_blank"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <ListSubheader style={{backgroundColor:"black", color: "red"} }>
                          Repo Name: {r.name}
                        </ListSubheader>
                        <ListItem>
                        <ListItemText primary={"Repo Description: "+r.description}/>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"Last Update : " + r.updated_at}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"Last Push : " + r.pushed_at}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"Create Time : " + r.created_at}
                          />
                        </ListItem>
                      </a>
                    </ul>
                  </li>
                ))}
              </List>
            </Collapse>
            <Collapse in={expanded === "follower"} timeout="auto" unmountOnExit>
              <List
                className={classes.listRoot}
                subheader={<li />}
                style={{
                  backgroundImage: `url("/img/card.jpg")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                {follower.map((r) => (
                  <li key={`section-${0}`} className={classes.listSection}>
                    <ul style={{ padding: "0px" }}>
                      <a
                        href={r.html_url}
                        target="_blank"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar alt={r.login} src={r.avatar_url} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={"Github User Name: " + r.login}
                          />
                        </ListItem>
                      </a>
                    </ul>
                  </li>
                ))}
              </List>
            </Collapse>
          </div>
        </div>
        <CardMedia className={classes.cover} image={data.avatar_url} />
      </Card>
    </div>
  );
};

export default Body;
