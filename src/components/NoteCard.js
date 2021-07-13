import React from 'react'
import { Typography, Container, Card, CardHeader, Avatar, IconButton, CardContent } from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {red, blue ,yellow} from '@material-ui/core/colors';
import { DeleteOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345
    },
    avatar: {
      backgroundColor: (note) => {
        if(note.category == 'reminders')
            return red[700]
        if(note.category === 'work')
            return yellow[700]
        if(note.category === 'todos')
            return blue[600]    
      }
    }
  }));
  


function NoteCard({note,handleDelete}) {
    const classes = useStyles(note); 
    return (
        <Card className={classes.root}>  <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={() => handleDelete(note.id)}>
               <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
           {note.details}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default NoteCard
 