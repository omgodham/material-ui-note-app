import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/notes/${id}` ,{
        method:'DELETE'
    })
     setNotes(notes.filter(note => note.id !== id));
}

  return (
    <Container color="primary">
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes?.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
      </Masonry>
      {/* <Grid container spacing={4}>
      {notes?.map(note => (
        <Grid container item xs={12} md={4} key={note.id}>
          <NoteCard note={note}/>
        </Grid>
      ))}
      </Grid> */}
    </Container>
  );
}

export default Notes;
