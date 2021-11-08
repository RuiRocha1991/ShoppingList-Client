import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {connect} from "react-redux";
import {
  addItems, addItemToAdd,
  addItemToRemove,
  changeQuantityOnSelected,
  changeQuantityOnUnselected,
  closePurchasesDialog, finishShoppingMode,
  removeItems, saveShoppingList, saveShoppingMode, selectOnShoppingMode,
  updateSelectedItems,
  updateUnselectedItems
} from "../../../../redux/actions/shoppingList.actions";
import {ListItems} from "./components";
import {red} from "@material-ui/core/colors";
import clsx from "clsx";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitleCustom = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
      <DialogTitle
          className={classes.root}
          disableTypography
          {...other}
      >
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
            >
              <CloseIcon/>
            </IconButton>
        ) : null}
      </DialogTitle>
  );
});

const DialogContentCustom = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(DialogContent);

const DialogActionsCustom = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(DialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
      width: 200,
    },
  },
  progress: {
    marginRight: theme.spacing(1)
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  buttonLeft: {
    backgroundColor: red[500],
  },
  buttons: {
    flexGrow: 4,
    margin: '0 8px'
  },
  buttonsContainer: {
    borderTop: '1px solid #e8eaf6',
    borderBottom: '1px solid #e8eaf6',
    display: "flex"
  },
}));

const PurchasesDialog = ({
  handleClose,
  handleSave,
  isFetching,
  dialogConfig,
  shoppingList,
  handleUpdateUnselectedItems,
  handleUpdateSelectedItems,
  handleRemoveItems,
  handleAddItems,
  handleChangeQuantityOnSelected,
  handleChangeQuantityOnUnselected,
  handleSelectOnSelectedList,
  handleSelectOnUnselectedList,
  itemsTransactions,
  isShoppingMode,
  handleSelectOnShoppingMode,
  handleSaveOnShoppingMode,
  handleFinishShoppingMode,
  isCompleted,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <div>
        <Dialog
            aria-labelledby="customized-dialog-title"
            fullScreen={fullScreen}
            fullWidth
            maxWidth={'xs'}
            onClose={(event, reason) => {
              if (reason !== 'backdropClick') {
                handleClose();
              }
            }}
            open={dialogConfig.isOpen}
        >
          <DialogTitleCustom
              id="customized-dialog-title"
              onClose={handleClose}
          >
            Prepare Purchase
          </DialogTitleCustom>
          <DialogContentCustom dividers>

            {!isShoppingMode && <>
              <ListItems className={classes.list}
                         itemsList={shoppingList.selectedItems}
                         setList={handleUpdateSelectedItems}
                         handleChangeQuantity={handleChangeQuantityOnSelected}
                         handleSelect={handleSelectOnSelectedList}
                         title={"Selected"}
              />
              <Box className={classes.buttonsContainer} component="div" my={1}
                   py={1}>
                <Button className={clsx(classes.buttons, classes.buttonLeft)}
                        size="large"
                        variant="contained" color="warning"
                        onClick={() => handleRemoveItems()}
                        disabled={itemsTransactions.selectedList.length === 0}
                >Remove</Button>
                <Button className={classes.buttons} size="large"
                        variant="contained" color="primary"
                        onClick={() => handleAddItems()}
                        disabled={itemsTransactions.unselectedList.length === 0}
                >Add</Button>
              </Box>
              <ListItems className={classes.list}
                         itemsList={shoppingList.unselectedItems}
                         setList={handleUpdateUnselectedItems}
                         handleChangeQuantity={handleChangeQuantityOnUnselected}
                         handleSelect={handleSelectOnUnselectedList}
                         title={"Unselected"}
              />
            </>}
            {isShoppingMode && <>
              <List >
                {shoppingList.shoppingMode.map(item => (
                    <ListItem divider={true} key={item._id}>
                      <ListItemIcon>
                        <Checkbox
                            checked={item.isCollected}
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            inputProps={{'aria-labelledby': item._id}}
                            onChange={(event) => handleSelectOnShoppingMode(item._id, event.target.checked)}
                        />
                      </ListItemIcon>
                      <ListItemText id={item._id} primary={item.item.name}/>
                      <ListItemSecondaryAction>
                        <TextField
                            label={item.item.unitMeasurement.toUpperCase()}
                            name={item.item.name}
                            value={item.quantity} style={{textAlign: 'right', maxWidth: '50px'}}
                            disabled
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                ))}
              </List>
            </>}

          </DialogContentCustom>
          <DialogActionsCustom>
            {isFetching && <CircularProgress size={20} color='inherit'
                                             className={classes.progress}/>}
            <Button
                disabled={isFetching}
                autoFocus
                color="primary"
                onClick={() => {
                  if (isShoppingMode) {
                    if(isCompleted) {
                      handleFinishShoppingMode(shoppingList)
                    } else {
                      handleSaveOnShoppingMode(shoppingList);
                    }
                  } else {
                    handleSave(shoppingList);
                  }
                }}
            >
              {isCompleted && isShoppingMode ? 'Finish Purchase':'Save changes'}
            </Button>
          </DialogActionsCustom>
        </Dialog>
      </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  dialogConfig: state.shoppingList.purchases,
  shoppingList: state.shoppingList.purchases.shoppingList,
  itemsTransactions: state.shoppingList.purchases.itemsTransactions,
  isShoppingMode: state.shoppingList.purchases.shoppingMode,
  isCompleted: state.shoppingList.purchases.isCompleted,
})

const mapDispatchToProps = (dispatch) => ({
  handleSave: (shoppingList) => {
    dispatch(saveShoppingList(shoppingList));
  },
  handleClose: () => {
    dispatch(closePurchasesDialog());
  },
  handleUpdateUnselectedItems: (list) => {
    dispatch(updateUnselectedItems(list));
  },
  handleUpdateSelectedItems: (list) => {
    dispatch(updateSelectedItems(list));
  },
  handleRemoveItems: () => {
    dispatch(removeItems());
  },
  handleAddItems: () => {
    dispatch(addItems());
  },
  handleChangeQuantityOnSelected: (id, quantity) => {
    dispatch(changeQuantityOnSelected(id, quantity));
  },
  handleChangeQuantityOnUnselected: (id, quantity) => {
    dispatch(changeQuantityOnUnselected(id, quantity))
  },
  handleSelectOnSelectedList: (id, isChecked) => {
    dispatch(addItemToRemove(id, isChecked));
  },
  handleSelectOnUnselectedList: (id, isChecked) => {
    dispatch(addItemToAdd(id, isChecked));
  },
  handleSelectOnShoppingMode: (id, isChecked) => {
    dispatch(selectOnShoppingMode(id, isChecked));
  },
  handleSaveOnShoppingMode: (shoppingList) => {
    dispatch(saveShoppingMode(shoppingList));
  },
  handleFinishShoppingMode: (shoppingList) => {
    dispatch(finishShoppingMode(shoppingList));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesDialog)
