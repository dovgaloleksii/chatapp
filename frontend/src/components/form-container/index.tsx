import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 700,
      margin: 'auto',
    },
    root: {
      padding: theme.spacing(2),
      width: 'unset',

      '&>div, &>button': {
        margin: theme.spacing(2),
      },
      '&>.MuiTypography-root': {
        flex: 1,
      },
    },
  }),
);

export const FormContainer: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.root}>
        {React.Children.map(children, (child) => child)}
      </Grid>
    </Paper>
  );
};
