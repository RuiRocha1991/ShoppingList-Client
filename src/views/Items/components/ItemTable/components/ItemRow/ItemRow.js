import {makeStyles} from "@material-ui/styles";
import React from "react";
import {
  Box,
  Collapse, Table, TableBody,
  TableCell, TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import moment from "moment";
import {CustomVerticalActions} from "../index";
import {
  openDeleteCategoryDialod, openDeleteItemDialod, openDialogToCreateItem,
  openDialogToEditCategory, openDialogToEditItem
} from "../../../../../../redux/actions/category.actions";
import {connect} from "react-redux";

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  items: {
    height: '50px'
  },
  hiddenColumns: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
}));

const ItemRow = ({category, handleEdit, handleDelete, handleCreateItemDialog, handleDeleteItem, handleEditItem,}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let style = {}
  if(open){
    style = {backgroundColor:'white'}
  }
  return (
      <React.Fragment>
        <TableRow hover className={classes.root} style={style}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {category.name}
          </TableCell>
          <TableCell align="right" className={classes.hiddenColumns}>{category.items.length}</TableCell>
          <TableCell align="right" className={classes.hiddenColumns}>{0}</TableCell>
          <TableCell align="right" className={classes.hiddenColumns}>{moment(category.updatedAt).format('DD/MM/YYYY')}</TableCell>
          <TableCell align="right">
            <CustomVerticalActions category={category} handleCreateItemDialog={handleCreateItemDialog} handleEdit={handleEdit} handleDelete={handleDelete} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <Typography variant="h6" gutterBottom component="div">
                  Items
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Default Quantity</TableCell>
                      <TableCell className={classes.hiddenColumns}>Unit </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {category.items.map((item) => (
                        <TableRow hover key={item._id} className={classes.items}>
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.defaultQuantity}
                          </TableCell>
                          <TableCell component="th" scope="row" className={classes.hiddenColumns}>
                            {item.unitMeasurement}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <CustomVerticalActions category={category} item={item} handleDelete={handleDeleteItem} handleEdit={handleEditItem} />
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}

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

export default connect(null, mapDispatchToProps)(ItemRow);