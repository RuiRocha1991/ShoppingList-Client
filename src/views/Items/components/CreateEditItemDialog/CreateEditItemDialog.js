import React, {useEffect, useState} from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import {
  Button, CircularProgress, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl,
  IconButton, InputLabel, makeStyles, MenuItem, Select, TextField,
  Typography, useMediaQuery, useTheme,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  closeItemsDialog
} from "../../../../redux/actions/ui.actions";
import {connect} from "react-redux";
import {createItem, editItem} from "../../../../redux/actions/item.actions";


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
  const { children, classes, onClose, ...other } = props;
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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 25
    },
  },
  defaultQuantity: {
    presence: {allowEmpty: false}
  }
};

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
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingBottom: 32,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  fields: {
    marginTop: theme.spacing(2)
  },
  progress: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    minWidth: 120,
  },
}));

const CreateEditItemDialog = ({isItemDialogOpen, item, handleClose, handleSave, isFetching, currentCategories}) => {
  const [formState, setFormState] = useState( {
      isValid: false,
      values: {
        name: item ? item.name : '',
        category: item ? item.category._id : '',
        unitMeasurement: item ? item.unitMeasurement : '',
        defaultQuantity: item ? item.defaultQuantity : 0
      },
      touched: {},
      remaining: {
        name: item ? schema.name.length.maximum - item.name.length : schema.name.length.maximum
      },
      errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      remaining: {
        ...formState.remaining,
        ...calculateRemaining(event.target)
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const calculateRemaining = (target) => {
    if (target.name !== 'category' && target.name !== 'unitMeasurement' && target.name !== 'defaultQuantity') {
      return {
        [target.name]: schema[target.name].length.maximum - target.value.length
      }
    }
  }

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        fullScreen={fullScreen}
        fullWidth
        maxWidth={'sm'}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        open={isItemDialogOpen}
      >
        <DialogTitleCustom
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {item ? 'Edit Item' : 'New Item'}
        </DialogTitleCustom>
        <DialogContentCustom dividers>
          <div className={classes.contentBody}>
            <form
              autoComplete="off"
              className={classes.form}
            >
              <TextField
                className={classes.fields}
                error={hasError('name') || formState.remaining.name === 0}
                fullWidth
                helperText={
                  hasError('name') ? formState.errors.name[0] : formState.remaining.name + ' characters remaining.'
                }
                label="Name"
                name="name"
                onChange={handleChange}
                type="text"
                value={formState.values.name}
                inputProps={{ maxLength: schema.name.length.maximum }}
              />
              <FormControl fullWidth className={clsx(classes.formControl, classes.fields)}>
                <InputLabel id="select-item-category">Category</InputLabel>
                <Select
                    name="category"
                    labelId="select-item-category"
                    id="select-item-category"
                    value={formState.values.category}
                    onChange={handleChange}
                >
                  {currentCategories.map(category => <MenuItem value={category._id}>{category.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth className={clsx(classes.formControl, classes.fields)}>
                <InputLabel id="select-item-unitMeasurement">Unidade de Medida</InputLabel>
                <Select
                    name="unitMeasurement"
                    labelId="select-item-unitMeasurement"
                    id="select-item-unit-measurement"
                    value={formState.values.unitMeasurement}
                    onChange={handleChange}
                >
                  <MenuItem value="gramas">Gramas</MenuItem>
                  <MenuItem value="Kilogramas">Kilogramas</MenuItem>
                  <MenuItem value="litros">Litros</MenuItem>
                  <MenuItem value="unidades">Unidades</MenuItem>
                  <MenuItem value="metros">Metros</MenuItem>
                </Select>
              </FormControl>
              <TextField
                  className={classes.fields}
                  error={hasError('defaultQuantity')}
                  fullWidth
                  helperText={
                    hasError('defaultQuantity') ? formState.errors.defaultQuantity[0] : ''
                  }
                  label="Default Quantity"
                  name="defaultQuantity"
                  onChange={handleChange}
                  type="number"
                  value={formState.values.defaultQuantity}

              />
            </form>
          </div>

        </DialogContentCustom>
        <DialogActionsCustom>
          {isFetching && <CircularProgress size={20} color='inherit' className={classes.progress} />}
          <Button
            disabled={ formState.values.name.length === 0
            || formState.values.category.length === 0
            || formState.values.unitMeasurement.length === 0
            || formState.values.defaultQuantity.length === 0
            || isFetching}
            autoFocus
            color="primary"
            onClick={() => handleSave(formState.values, item)}
          >
            Save changes
          </Button>
        </DialogActionsCustom>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isItemDialogOpen: state.ui.isItemDialogOpen,
  isFetching: state.ui.isFetching,
  item: state.item.selectedItem,
  currentCategories: state.item.currentCategories
})

const mapDispatchToProps = (dispatch) => ({
  handleSave: (newFormValues, item) => {
    if (item) {
       dispatch(editItem(newFormValues, item));
    } else {
      dispatch(createItem(newFormValues));
    }

  },
  handleClose: () => {
    dispatch(closeItemsDialog());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditItemDialog)
