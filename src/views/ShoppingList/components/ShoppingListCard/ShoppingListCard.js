import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {red} from '@material-ui/core/colors';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListSubheader,
  ListItemSecondaryAction,
  TextField,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ViewListIcon from '@material-ui/icons/ViewList';
import {calculateLastUpdateAt, getInitials} from "../../../../helpers";
import {connect} from "react-redux";
import {CustomVerticalActions} from "./components";
import {
  openDeleteDialog,
  openDialogToEdit, openPurchasesDialog
} from "../../../../redux/actions/shoppingList.actions";

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
  const {
    className,
    shoppingList,
    handleEdit,
    handleDelete,
    handlePurchases,
    ...rest
  } = props;
  console.log(shoppingList)
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
              <CustomVerticalActions shoppingList={shoppingList}
                                     handleEdit={handleEdit}
                                     handleDelete={handleDelete}
                                     handlePurchases={handlePurchases}/>
            }
            title={shoppingList.name}
            subheader={shoppingList.description}
        />
        <CardContent className={classes.content}>
          <Paper style={{maxHeight: 500, overflow: 'auto'}}>
            <List className={classes.root} subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Selected Items
              </ListSubheader>
            }>
              {shoppingList.selectedItems.map((item) => (
                  <ListItem key={`item-${item._id}`} divider={true}>
                    <ListItemText primary={item.item.name}/>
                    <ListItemSecondaryAction>
                      <TextField
                          label={item.item.unitMeasurement.toUpperCase()}
                          name="name"
                          type="number"
                          value={item.quantity}
                          style={{textAlign: 'right', maxWidth: '50px'}}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
              ))}
            </List>
          </Paper>
        </CardContent>
        <Divider/>
        <CardActions>
          <Grid
              container
              justify="space-between"
          >
            <Grid
                className={classes.statsItem}
                item
            >
              <AccessTimeIcon className={classes.statsIcon}/>
              <Typography
                  display="inline"
                  variant="body2"
              >
                Updated {calculateLastUpdateAt(shoppingList.updatedAt)} ago
              </Typography>
            </Grid>
            <Grid
                className={classes.statsItem}
                item
            >
              <ViewListIcon className={classes.statsIcon}/>
              <Typography
                  display="inline"
                  variant="body2"
              >
                {`Has ${shoppingList.selectedItems.length} Items selected`}
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
    dispatch(openDeleteDialog(shoppingList));
  },
  handlePurchases: (shoppingList) => {
    dispatch(openPurchasesDialog(shoppingList));
  }
})

export default connect(null, mapDispatchToProps)(ShoppingListCard);