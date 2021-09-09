import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
  root: {
    
    marginTop: 30,
    marginLeft: 16,

  },
  card: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    marginTop: 30,
  },
});


export default function DateAndTimePickers() {
  const classes = useStyles();
  return (
    <div>
    <TextField
    id="datetime-local"
    label="Neues Ereigniss"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"
    className={classes.root}
    InputLabelProps={{
      shrink: true,
    }}
  
    
  />

    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         AUSFLUG
        </Typography>
        <Typography variant="h5" component="h2">
          Wilheminenberg
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Jause wird mitgegeben
        </Typography>
        <Typography variant="body2" component="p">
          Am 13.9.21 von 09:00 - 13:00
          <br />
          {'Abholung erfolgt im KG'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">Zur Kenntniss genommen</Button>
      </CardActions>
    </Card>

    </div>
     

  );
}

