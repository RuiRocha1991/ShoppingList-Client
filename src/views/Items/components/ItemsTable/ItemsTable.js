import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
  TablePagination, Fab
} from '@material-ui/core';
import {
  openDeleteDialog,
  openItemsDialog
} from "../../../../redux/actions/ui.actions";
import {connect} from "react-redux";

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
  const { className, items, handleEdit, handleDelete, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

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
                {items.items.slice(0, rowsPerPage).map(item => (
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
                    <TableCell style={{ width: 150 }}>
                      <Fab aria-label="edit" size="small" className={classes.actionEdit}>
                        <EditIcon onClick={() => handleEdit(item)}/>
                      </Fab>
                      <Fab aria-label="delete" size="small" className={classes.actions}>
                        <DeleteIcon onClick={() => handleDelete(item)}/>
                      </Fab>

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
          count={items.items.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={items.currentPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 5, 10, 25]}
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
})

export default connect(null, mapDispatchToProps)(ItemsTable);
