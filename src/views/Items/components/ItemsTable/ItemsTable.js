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
  TablePagination
} from '@material-ui/core';

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
  actions: {
    marginRight: '16px',
  },
  hiddenCollumns: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

const ItemsTable = props => {
  const { className, items, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
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
                  <TableCell className={classes.hiddenCollumns}>Description</TableCell>
                  <TableCell className={classes.hiddenCollumns}>Unit M</TableCell>
                  <TableCell className={classes.hiddenCollumns}>Default Quantity</TableCell>
                  <TableCell className={classes.hiddenCollumns}>Shopping List</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.slice(0, rowsPerPage).map(item => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item._id}
                  >
                    <TableCell>
                      <Typography variant="body1">{item.name}</Typography>
                    </TableCell>
                    <TableCell className={classes.hiddenCollumns}>{item.name}</TableCell>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell className={classes.hiddenCollumns}>{item.name}</TableCell>
                    <TableCell className={classes.hiddenCollumns}>
                      {item.name}
                    </TableCell>
                    <TableCell className={classes.hiddenCollumns}>
                      {item.name}
                    </TableCell>
                    <TableCell style={{ width: 100 }}>
                      <EditIcon className={classes.actions}/> <DeleteIcon/>
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
          count={items.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ItemsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default ItemsTable;
