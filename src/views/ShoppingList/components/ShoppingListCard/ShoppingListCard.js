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
  ListItemIcon,
  Checkbox,
  ListSubheader,
  ListItemSecondaryAction,
  TextField,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ViewListIcon from '@material-ui/icons/ViewList';
import {getInitials} from "../../../../helpers";
import {connect} from "react-redux";
import {CustomVerticalActions} from "./components";
import {openDialogToEdit} from "../../../../redux/actions/shoppingList.actions";


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
    height: "500px",
    maxHeight: "500px"
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
  },
  listSection: {
    backgroundColor: theme.palette.background.paper,
  },
  ul: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const ShoppingListCard = props => {
  const { className, shoppingList, handleEdit, handleDelete, ...rest } = props;

  const classes = useStyles();
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
          className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {getInitials(shoppingList.name)}
            </Avatar>
          }
          action={
            <CustomVerticalActions shoppingList={shoppingList} handleEdit={handleEdit} handleDelete={handleDelete} />
          }
          title={shoppingList.name}
          subheader={shoppingList.description}
      />
      <CardContent className={classes.content}>
        <Paper style={{maxHeight: 500, overflow: 'auto'}}>
          <List className={classes.root} subheader={<li />}>
            {shoppingList.listItems.map((section) => (
                <li key={`section-${section.listName}`} className={classes.listSection}>
                  <ul className={classes.ul}>
                    <ListSubheader>{section.listName}</ListSubheader>
                    {section.list.map((item) => (
                        <ListItem key={`item-${item._id}`} divider={true}>
                          <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={item.item.name} />
                          <ListItemSecondaryAction>
                            <TextField type="number" value={item.item.defaultQuantity} style={{textAlign: 'right', maxWidth: '50px'}}/> <ListItemText secondary={item.item.unitMeasurement} />
                          </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                  </ul>
                </li>
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
              Updated 0min ago
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
              cenas
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleEdit: (shoppingList) => {
    dispatch(openDialogToEdit(shoppingList));
  },
  handleDelete: (shoppingList) => {
    dispatch(() => console.log("delete"));
  },
})

export default connect(null, mapDispatchToProps)(ShoppingListCard);