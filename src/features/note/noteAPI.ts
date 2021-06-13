import { Chance } from "chance";
import { generateNotes } from "../../mocks/generateNotes";

const chance = new Chance();

// Just keep notes in memory for demo purposes...
let backendPretendNoteDataBase: Note[] = [];

export const getNotes = (): Promise<Note[] | undefined> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        if (backendPretendNoteDataBase.length === 0) {
          backendPretendNoteDataBase = generateNotes(20);
        }

        res(backendPretendNoteDataBase);
      } catch (err) {
        rej(err);
      }
    }, 2000);
  });
};

export const saveNote = (note: Note): Promise<Note> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let newNote = { ...note };
      try {
        const noteIndexInArr = backendPretendNoteDataBase.findIndex(
          (n) => n.id === note.id
        );
        if (noteIndexInArr === -1) {
          // Simulates backend adding createdAt, index and id...
          newNote = {
            ...newNote,
            index: backendPretendNoteDataBase.length,
            id: chance.guid(),
            createdAt: new Date(),
          };
          backendPretendNoteDataBase.unshift(newNote);
        } else {
          backendPretendNoteDataBase[noteIndexInArr] = note;
        }
      } catch (err) {
        rej(err);
      }
      res(newNote);
    }, 1000);
  });
};
