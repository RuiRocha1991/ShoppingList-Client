import React, {useEffect, useState} from 'react';
import validate from 'validate.js';
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import {connect} from "react-redux";
import {
  closeDialogToCreateEditShoppingList,
  createShoppingList
} from "../../../../redux/actions/shoppingList.actions";


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
  description: {
    presence: {allowEmpty: true},
    length: {
      maximum: 50
    },
  },
  categories: {
    presence: { allowEmpty: false, message: 'is required' },
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
  textField: {
    marginTop: theme.spacing(2)
  },
  progress: {
    marginRight: theme.spacing(1)
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(categoryId, categoriesSelected, theme) {
  return {
    fontWeight:
        categoriesSelected.find(cat => cat._id === categoryId) !== undefined
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
  };
}

const CreateEditShoppingListDialog = ({list, handleClose, handleSave, isFetching, dialogConfig, categories}) => {
  const [formState, setFormState] = useState( {
      isValid: false,
      values: {
        name: list ? list.name : '',
        description: list ? list.description : '',
        categories:  list ? list.categories : []
      },
      touched: {},
      remaining: {
        name: list ? schema.name.length.maximum - list.name.length : schema.name.length.maximum,
        description: list ? schema.description.length.maximum - list.description.length : schema.description.length.maximum
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
    if(target.name !== 'categories'){
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
        open={dialogConfig.isOpen}
      >
        <DialogTitleCustom
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {list ? 'Edit Shopping List' : 'New Shopping List'}
        </DialogTitleCustom>
        <DialogContentCustom dividers>
          <div className={classes.contentBody}>
            <form
              autoComplete="off"
              className={classes.form}
            >
              <TextField
                className={classes.textField}
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
              <TextField
                  className={classes.textField}
                  error={hasError('description') || formState.remaining.description === 0}
                  fullWidth
                  helperText={
                    hasError('description') ? formState.errors.description[0] : formState.remaining.description + ' characters remaining.'
                  }
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.description}
                  inputProps={{ maxLength: schema.description.length.maximum }}

              />
              <FormControl fullWidth className={classes.textField}>
                <InputLabel id="categories-label">Categories</InputLabel>
                <Select
                    error={hasError('categories')}
                    name="categories"
                    aria-labelledby="categories-label"
                    id="categories-chip"
                    multiple
                    value={formState.values.categories}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                              <Chip key={value._id} label={value.name} className={classes.chip} />
                          ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                  {categories.data.map((category) => (
                      <MenuItem key={category._id} value={category} style={getStyles(category, formState.values.categories, theme)}>
                        {category.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </div>

        </DialogContentCustom>
        <DialogActionsCustom>
          {isFetching && <CircularProgress size={20} color='inherit' className={classes.progress} />}
          <Button
            disabled={ formState.values.categories.length === 0 || formState.values.name.length === 0 || isFetching}
            autoFocus
            color="primary"
            onClick={() => handleSave(formState.values, list)}
          >
            Save changes
          </Button>
        </DialogActionsCustom>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  dialogConfig: state.shoppingList.dialogToCreateEditList,
  categories: state.shoppingList.categories,
})

const mapDispatchToProps = (dispatch) => ({
  handleSave: (newFormValues, shoppingList) => {
    if (shoppingList) {
      dispatch(() => console.log("Edit shopping list"));
    } else {
      dispatch(createShoppingList(newFormValues));
    }

  },
  handleClose: () => {
    dispatch(closeDialogToCreateEditShoppingList());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditShoppingListDialog)
