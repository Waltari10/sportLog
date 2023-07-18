import { Note } from "@common/types";
import { Chance } from "chance";
import express from "express";

import { NoteDB } from "./notesDB";

const chance = new Chance();

import { REST_PORT } from "@common/constants";
import bodyParser from "body-parser";

export const expressRestApp = express();
expressRestApp.use(bodyParser.urlencoded({ extended: true }));
expressRestApp.use(bodyParser.json());
expressRestApp.use(bodyParser.raw());

/**
 * Starts rest server which is used to handle saving and retrieving notes.
 */
export const startRestApp = () => {
  expressRestApp.get("/getNotes", (_, res) => {
    console.log("getNotes");
    return res.send(JSON.stringify(NoteDB));
  });

  expressRestApp.post("/saveNote", (req, res) => {
    let newNote: Note = req.body as Note;
    try {
      const noteIndexInArr = NoteDB.findIndex(n => n.id === newNote.id);
      if (noteIndexInArr === -1) {
        console.log("new note");
        // Simulates backend adding createdAt, index and id...
        newNote = {
          ...newNote,
          index: NoteDB.length,
          id: chance.guid(),
          createdAt: new Date(),
        };
        NoteDB.unshift(newNote);
      } else {
        console.log("existing note");
        NoteDB[noteIndexInArr] = newNote;
      }

      res.send(newNote);
    } catch (err) {
      res.send(err);
    }
  });

  /**
   * Start listening to rest events
   */
  expressRestApp.listen(REST_PORT, () =>
    console.log(`SportLog rest server listening on port ${REST_PORT}!`)
  );
};
