import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  TextField,
  Typography,
  Radio,
  RadioGroup
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React,{useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  fields: {
    display: "block",
    margin: "20px 0",
  },
});


function CreateNote() {
  const classes = useStyles();
  const history = useHistory();
  const [values , setValues] = useState({
    title:"",
    category:"money",
    details:""
  });
  const {title , category , details} = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/notes' ,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,category,details})
    }).then(res => history.push('/'))
  }
  
  return (
    <Container>
      <Typography variant="h6" color="textSecondary">
        Create Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className={classes.fields}
          fullWidth
          required
          value={title}
          onChange={(e) => setValues({...values , title:e.target.value})}
        />
        <TextField
          className={classes.fields}
          id="outlined-basic"
          label="Details"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          value={details}
          onChange={(e) => setValues({...values , details:e.target.value})}
        />
        <FormControl component="fieldset" className={classes.fields}>
          <FormLabel component="legend">Note Category</FormLabel>
          <RadioGroup
            // aria-label="gender"
            name="category"
            value={category}
            onChange={(e) => setValues({...values , category:e.target.value})}
          >

            <FormControlLabel value="money" control={<Radio color="primary"/>} label="Money" />
            <FormControlLabel value="work" control={<Radio color="primary"/>} label="Work" />
            <FormControlLabel value="todos" control={<Radio color="primary"/>} label="Todos" />
            
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
        >
          Submit
        </Button>
        
      </form>
    </Container>
  );
}

export default CreateNote;
