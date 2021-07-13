import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  ListItemIcon
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React,{useState} from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { format } from "date-fns";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#f9f9f9",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(10),
    },

    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(9),
    },
  },
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    height: "100vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#fefefe",
  },
  title: {
    flexGrow: "1",
    padding: theme.spacing(2),
  },
  listItem:{
      backgroundColor:'#f4f4f4'
  },
  date:{
    flexGrow: "1",
  }
}));

function Layout(props) {
   const history = useHistory();
   const location = useLocation();

  const classes = useStyles();

  const { window } = props;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuItems = [
      {
        text:'My Notes',
        icon:<SubjectOutlined color="primary"/>,
        path:'/'
      },
      {
        text:'Create Note',
        icon:<AddCircleOutlineOutlined color="primary"/>,
        path:'/create'
      }
  ]
  const drawer = (
    <div>
      <div>
        <Typography variant="h6" className={classes.title} color='textSecondary'>
          Short Notes
        </Typography>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => {history.push(item.path)}} className={item.path === location.pathname ? classes.listItem : null }>
            <ListItemIcon >{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            color="primary"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            color="textSecondary"
            className={classes.date}
          >
            Today is the {format(new Date(), "do MMMM yyyy")}
          </Typography>
          <Avatar src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.toolbar} />
      <div className={classes.page}>{props.children}</div>
    </div>
  );
}
Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
