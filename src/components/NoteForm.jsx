import React from 'react';

const NoteForm = () => {
  const saveNote = (e) => {
    e.preventDefault()
    console.log(e)
    // save locally, check for internet, save to firebase
  }
  return <form action='' onSubmit={saveNote}>
    <input type='text' name='example' placeholder='example' />
    <input type="submit" value="Submit" />
  </form>;
};

export default NoteForm;
