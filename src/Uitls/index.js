import { addNote, addTech, addSite, deleteNote, deleteTech, deleteSite } from "../db/firebase";
import { Site, Tech, Note } from "../db/models";

// Create Functions
export const createTech = async (name) => {
  try {
    if (process.env.DATABASE === 'mongo') {
      const tech = new Tech({ name });
      await tech.save();
    } else {
      await addTech({ name });
    }
    return { message: 'Tech added' };
  } catch (error) {
    console.error('Error creating tech:', error);
    throw error;
  }
};

export const createSite = async (name) => {
  try {
    if (process.env.DATABASE === 'mongo') {
      const site = new Site({ name });
      await site.save();
    } else {
      await addSite({ name });
    }
    return { message: 'Site added' };
  } catch (error) {
    console.error('Error creating site:', error);
    throw error;
  }
};

export const createNote = async (name) => {
  try {
    if (process.env.DATABASE === 'mongo') {
      const note = new Note({ name });
      await note.save();
    } else {
      await addNote({ name });
    }
    return { message: 'Note added' };
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Delete Functions
export const removeTech = async (id) => {
  try {
    if (process.env.DATABASE === 'mongo') {
      await Tech.findByIdAndDelete(id);
    } else {
      await deleteTech(id);
    }
    return { message: 'Tech deleted' };
  } catch (error) {
    console.error('Error deleting tech:', error);
    throw error;
  }
};

export const removeSite = async (id) => {
  try {
    if (process.env.DATABASE === 'mongo') {
      await Site.findByIdAndDelete(id);
    } else {
      await deleteSite(id);
    }
    return { message: 'Site deleted' };
  } catch (error) {
    console.error('Error deleting site:', error);
    throw error;
  }
};

export const removeNote = async (id) => {
  try {
    if (process.env.DATABASE === 'mongo') {
      await Note.findByIdAndDelete(id);
    } else {
      await deleteNote(id);
    }
    return { message: 'Note deleted' };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
