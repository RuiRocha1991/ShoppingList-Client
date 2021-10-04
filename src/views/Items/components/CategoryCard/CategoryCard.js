import React from 'react';
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
import {getInitials} from "../../../../helpers";
import moment from "moment";
import {connect} from "react-redux";
import {
  openDeleteCategoryDialod,
  openDeleteItemDialod,
  openDialogToCreateItem,
  openDialogToEditCategory,
  openDialogToEditItem
} from "../../../../redux/actions/category.actions";
import {CustomVerticalActions} from "../";
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
  const { className, category, handleEdit, handleDelete, handleCreateItemDialog,handleDeleteItem, handleEditItem, ...rest } = props;

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
              {getInitials(category.name)}
            </Avatar>
          }
          action={
            <CustomVerticalActions category={category} handleDelete={handleDelete} handleEdit={handleEdit} handleCreateItemDialog={handleCreateItemDialog}/>
          }
          title={category.name}
          subheader={category.description}
      />
      <CardContent className={classes.content}>

        <Paper style={{maxHeight: 300, overflow: 'auto'}}>
          <List>
            {category.items.map((item, i) => (
                <ListItem
                    divider={i < category.items.length - 1}
                    key={item._id}
                >
                  <ListItemText
                      primary={item.name}
                  />
                  <IconButton
                      edge="end"
                      size="small"
                  >
                    <CustomVerticalActions category={category} handleDelete={handleDeleteItem} handleEdit={handleEditItem} item={item}/>
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
    dispatch(openDialogToEditCategory({category}));
  },
  handleDelete: (category) => {
    dispatch(openDeleteCategoryDialod({category}));
  },
  handleCreateItemDialog: (category) => {
    dispatch(openDialogToCreateItem({category}));
  },
  handleEditItem: (category, item) => {
    dispatch(openDialogToEditItem({category, item}));
  },
  handleDeleteItem: (category, item) => {
    dispatch(openDeleteItemDialod({category, item}))
  }
})

export default connect(null, mapDispatchToProps)(CategoryCard);