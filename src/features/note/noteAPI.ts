import axios from "axios";
import { ws } from "../../websocket";

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
    console.log("note", note);
    const res = await axios.post(host + "/saveNote", note);
    console.log("save note res", res);

    return res.data as Note;
  } catch (err) {
    return err;
  }
};

export const saveNoteWS = (note: Note): void => {
  try {
    ws.send(JSON.stringify({ type: "SAVE_NOTE", payload: { note } }));
  } catch (err) {
    console.log("Error save note WS ", err);
  }
};
