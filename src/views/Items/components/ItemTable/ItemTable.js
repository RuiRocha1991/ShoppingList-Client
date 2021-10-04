import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";

import {ItemRow} from './components'

const useStyles = makeStyles(theme => ({
  hiddenColumns: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
}));


const ItemTable = ({categories}) => {
  const classes = useStyles();
  return(
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Name</TableCell>
            <TableCell align="right">
              Items</TableCell>
            <TableCell align="right">Shopping List</TableCell>
            <TableCell align="right" className={classes.hiddenColumns}>Last
              Update</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
              <ItemRow key={category.name} category={category}/>
          ))}
        </TableBody>
      </Table>
  )
}

export default ItemTable