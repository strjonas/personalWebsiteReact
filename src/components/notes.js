import React from "react";
import Note from "./note";

export default function Notes2({ notes, deleteNote }) {
  return notes.map((note) => {
    return <Note key={note.id} deleteNote={deleteNote} note={note} />;
  });
}
