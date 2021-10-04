import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import {
  changePageOnItemsTable, changeRowsPerPageOnItemsTable,
  openDeleteDialog,
  openItemsDialog
} from "../../../../redux/actions/ui.actions";
import {connect} from "react-redux";
import {CustomVerticalActions} from "../../../../components";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  tableRow: {
    height: '40px'
  },
  tableActions: {
    justifyContent: 'flex-end'
  },
  hiddenColumns: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  actionEdit: {
    marginRight: theme.spacing(2)
  }
}));

const ItemsTable = props => {
  const { className, items, handleEdit, handleDelete, handlePageChange, handleChangeRowsPerPage, ...rest } = props;

  const classes = useStyles();




  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Default Quantity</TableCell>
                  <TableCell className={classes.hiddenColumns}>Unit M</TableCell>
                  <TableCell className={classes.hiddenColumns}>Shopping List</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.items.map(item => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item._id}
                  >
                    <TableCell>
                      <Typography variant="body1">{item.name}</Typography>
                    </TableCell>
                    <TableCell>{item.defaultQuantity}</TableCell>
                    <TableCell className={classes.hiddenColumns}>{item.unitMeasurement}</TableCell>
                    <TableCell className={classes.hiddenColumns}>0</TableCell>
                    <TableCell >{item.category.name}</TableCell>
                    <TableCell style={{ width: 20 }}>
                      <CustomVerticalActions handleEdit={handleEdit} handleDelete={handleDelete} object={item}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.tableActions}>
        <TablePagination
          component="div"
          count={items.totalItems}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={items.currentPage}
          rowsPerPage={items.rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </CardActions>
    </Card>
  );
};

ItemsTable.propTypes = {
  className: PropTypes.string,
  items: PropTypes.object.isRequired
};


const mapDispatchToProps = (dispatch) => ({
  handleEdit: (item) => {
    dispatch(openItemsDialog(item));
  },
  handleDelete: (item) => {
    dispatch(openDeleteDialog(item));
  },
  handlePageChange: (event, page) => {
    dispatch(changePageOnItemsTable(page + 1))
  },
  handleChangeRowsPerPage: (event) => {
    dispatch(changeRowsPerPageOnItemsTable(event.target.value))
  }
})

export default connect(null, mapDispatchToProps)(ItemsTable);
