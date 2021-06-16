import axios from "axios";

const host = "http://localhost:8090";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const res = await axios.get(host + "/getNotes");

    return res.data as Note[];
  } catch (err) {
    return err;
  }
};

export const saveNote = async (note: Note): Promise<Note> => {
  try {
    const res = await axios.post(host + "/saveNote", note);

    return res.data as Note;
  } catch (err) {
    return err;
  }
};
