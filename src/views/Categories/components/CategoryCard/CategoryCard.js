import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ViewListIcon from '@material-ui/icons/ViewList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {getInitials} from "../../../../helpers";
import moment from "moment";
import {connect} from "react-redux";
import {
  openDeleteDialog,
  openDialog
} from "../../../../redux/actions/ui.actions";
import PopperCustom from "../../../../components/PopperCustom";
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    backgroundColor: 'rgba(1, 1, 1, 0.04)'
  },
  content: {
    padding: 0,
    height: "300px",
    maxHeight: "300px"
  },
  image: {
    height: 48,
    width: 48
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const calculateLastUpdateTime = (lastUpdate) => {
  const now = moment(new Date());

  if(now.diff(lastUpdate,'days') > 0) {
    return now.diff(lastUpdate,'days') + 'days';
  } else if(now.diff(lastUpdate,'hours') > 0) {
    return now.diff(lastUpdate,'hours') + 'hr';
  } else {
      return now.diff(lastUpdate,'minutes') + 'min'
    }
}

const CategoryCard = props => {
  const { className, category, handleEdit, handleDelete, ...rest } = props;
  const [state, setState] = useState({
    anchorEl: null,
    isOpen: false
  });

  const handleOpen = (event) => {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      anchorEl: event.currentTarget
    }));
  };

  const handleClose = () => {
    setState((state) => ({
      ...state,
      isOpen: false,
      anchorEl: null
    }));
  };

  const classes = useStyles();
  const items = [];
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
          className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {getInitials(category.name)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={(event) => handleOpen(event)} aria-haspopup="true">
              <MoreVertIcon />
            </IconButton>
          }
          title={category.name}
          subheader={category.description}
      />
      <CardContent className={classes.content}>
        <PopperCustom anchorEl={state.anchorEl} isOpen={state.isOpen} handleClose={handleClose} handleEdit={handleEdit} handleDelete={handleDelete} category={category}/>
        <Paper style={{maxHeight: 300, overflow: 'auto'}}>
          <List>
            {items.map((item, i) => (
                <ListItem
                    divider={i < item.length - 1}
                    key={item._id}
                >
                  <ListItemText
                      primary={item.name}
                  />
                  <IconButton
                      edge="end"
                      size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
            ))}
          </List>
        </Paper>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Updated {calculateLastUpdateTime(category.updatedAt)} ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <ViewListIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              5 Shopping Lists
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  handleEdit: (category) => {
    dispatch(openDialog(category));
  },
  handleDelete: (category) => {
    dispatch(openDeleteDialog(category));
  },
})

export default connect(null, mapDispatchToProps)(CategoryCard);