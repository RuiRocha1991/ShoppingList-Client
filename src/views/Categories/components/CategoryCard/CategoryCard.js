import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {getInitials} from "../../../../helpers";
import mockData from './data';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    backgroundColor: 'rgba(1, 1, 1, 0.04)'
  },
  content: {
    padding: 0,
    height: "300px",
    maxHeight: "300px"
  },
  image: {
    height: 48,
    width: 48
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const CategoryCard = props => {
  const { className, product, ...rest } = props;

  const classes = useStyles();
  const [products] = useState(mockData);
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
          className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {getInitials(product.title)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.title}
          subheader={product.description}
      />
      <CardContent className={classes.content}>
        <Paper style={{maxHeight: 300, overflow: 'auto'}}>
          <List>
            {products.map((product, i) => (
                <ListItem
                    divider={i < products.length - 1}
                    key={product.id}
                >
                  <ListItemText
                      primary={product.name}
                  />
                  <IconButton
                      edge="end"
                      size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
            ))}
          </List>
        </Paper>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {product.totalDownloads} Downloads
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default CategoryCard;
