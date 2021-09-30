import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ItemsToolbar, ItemsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Items = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <ItemsToolbar />
      <div className={classes.content}>
        <ItemsTable users={users} />
      </div>
    </div>
  );
};

export default Items;
