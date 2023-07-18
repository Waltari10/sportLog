import { Note } from "@common/types";
import { REST_URI } from "appConstants";
import axios from "axios";

export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get(`${REST_URI}/getNotes`);

  return res.data as Note[];
};

export const saveNote = async (
  note: Partial<Note>
): Promise<Note | undefined> => {
  const res = await axios.post(`${REST_URI}/saveNote`, note);

  return res.data as Note;
};
