import React, {useEffect, useState} from 'react';
import validate from 'validate.js';
import {
  Button, CircularProgress, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton, makeStyles, TextField,
  Typography, useMediaQuery, useTheme,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  createCategory,
  editCategory
} from "../../../../redux/actions/category.actions";

import {connect} from "react-redux";


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
}));

const CreateEditShoppingListDialog = ({category, handleClose, handleSave, isFetching}) => {
  const [formState, setFormState] = useState( {
      isValid: false,
      values: {
        name: category ? category.name : '',
        description: category ? category.description : '',
      },
      touched: {},
      remaining: {
        name: category ? schema.name.length.maximum - category.name.length : schema.name.length.maximum,
        description: category ? schema.description.length.maximum - category.description.length : schema.description.length.maximum
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

  const calculateRemaining = (target) => ({
        [target.name]: schema[target.name].length.maximum - target.value.length
      })

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
        open={false}
      >
        <DialogTitleCustom
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {category ? 'Edit Category' : 'New Category'}
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
            </form>
          </div>

        </DialogContentCustom>
        <DialogActionsCustom>
          {isFetching && <CircularProgress size={20} color='inherit' className={classes.progress} />}
          <Button
            disabled={ formState.values.name.length === 0 || isFetching}
            autoFocus
            color="primary"
            onClick={() => handleSave(formState.values, category)}
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
})

const mapDispatchToProps = (dispatch) => ({
  handleSave: (newFormValues, category) => {
    if (category) {
      dispatch(editCategory(newFormValues, category));
    } else {
      dispatch(createCategory(newFormValues));
    }

  },
  handleClose: () => {
    dispatch(() => console.log("close"));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditShoppingListDialog)
