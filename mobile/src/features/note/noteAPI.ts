import { Note } from "@common/types";
import { REST_HOST } from "appConstants";
import axios from "axios";

export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get(`${REST_HOST}/getNotes`);

  return res.data as Note[];
};

export const saveNote = async (
  note: Partial<Note>
): Promise<Note | undefined> => {
  const res = await axios.post(`${REST_HOST}/saveNote`, note);

  return res.data as Note;
};
