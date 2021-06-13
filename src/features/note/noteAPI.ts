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
    }, 1000);
  });
};

export const saveNote = (note: Note): Promise<Note> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        const noteIndexInArr = backendPretendNoteDataBase.findIndex(
          (n) => n.id === note.id
        );

        if (noteIndexInArr === -1) {
          // Simulates backend adding createdAt, index and id...
          backendPretendNoteDataBase.unshift({
            ...note,
            index: backendPretendNoteDataBase.length,
            id: chance.guid(),
            createdAt: new Date(),
          });
        } else {
          backendPretendNoteDataBase[noteIndexInArr] = note;
        }
      } catch (err) {
        rej(err);
      }
      res(note);
    }, 1000);
  });
};
