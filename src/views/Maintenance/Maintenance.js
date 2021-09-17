import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Box, Grid, Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 64,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const Maintenance = () => {

  const classes = useStyles();
  const [state, setState] = useState({
    images: [
      {
        image: 'maintenance_1.png',
        text: 'Building the website'
      },{
        image: 'maintenance_2.gif',
        text: 'Redesign the site'
      },{
        image: 'maintenance_3.gif',
        text: 'Conding'
      },{
        image: 'maintenance_4.gif',
        text: 'Hear public opinion'
      },{
        image: 'maintenance_5.gif',
        text: 'Inventing something new'
      },{
        image: 'maintenance_6.gif',
        text: 'Selecting Features'
      },{
        image: 'maintenance_7.gif',
        text: 'In the market looking for sponsorships'
      },{
        image: 'maintenance_8.gif',
        text: 'Debating ideas'
      },{
        image: 'maintenance_9.gif',
        text: 'Closing deals'
      },{
        image: 'maintenance_10.gif',
        text: 'Working on your protection'
      },{
        image: 'maintenance_11.gif',
        text: 'Improve features'
      },{
        image: 'maintenance_12.png',
        text: 'Looking for the problems'
      },
    ],
    selectedImage: 0
  });

  useEffect(() => {
    setTimeout(() => {
      let index = state.selectedImage;
      if(index === 11) {
        index = 0;
      }
      setState({
        ...state,
        selectedImage: index + 1
      })
    }, 10000);
  });
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              Sorry, we're down for maintenance.
            </Typography>
            <Typography variant="subtitle2">
              We will be back up shortly
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src={`/images/maintenance/${state.images[state.selectedImage].image}`}
            />
            <Box >
              <Typography variant="h4">
               or
              </Typography>
              <Typography variant="h6">
                {state.images[state.selectedImage].text}
              </Typography>
            </Box>
          </div>

        </Grid>
      </Grid>
    </div>
  );
};

export default Maintenance;
