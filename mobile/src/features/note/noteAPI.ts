import { Note } from "@common/types";
import axios from "axios";

import { Logger } from "../../library/logger";

const HOST = "http://localhost:8090";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const res = await axios.get(`${HOST}/getNotes`);

    return res.data as Note[];
  } catch (err) {
    Logger.error(err);
  }
  return [];
};

export const saveNote = async (note: Note): Promise<Note | undefined> => {
  try {
    const res = await axios.post(`${HOST}/saveNote`, note);

    return res.data as Note;
  } catch (err) {
    Logger.error(err);
  }
};
