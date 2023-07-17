import { Note } from "@common/types";
import axios from "axios";

const HOST = "http://localhost:8090";

export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get(`${HOST}/getNotes`);

  return res.data as Note[];
};

export const saveNote = async (note: Note): Promise<Note | undefined> => {
  const res = await axios.post(`${HOST}/saveNote`, note);

  return res.data as Note;
};
