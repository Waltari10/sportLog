import { Note } from "@common/types";
import { Chance } from "chance";

const chance = new Chance();

/**
 * Generate some mock data for testing functionality
 */
const generateNotes = (count: number) => {
  const notes: Note[] = [];

  /**
   * Add bunch of random notes
   */
  for (let i = 0; i < count; i++) {
    notes.push({
      id: chance.guid(),
      createdAt: chance.date({ year: 2020, string: false }) as Date,
      index: i,
      author: chance.name(),
      title: chance.sentence({ words: 4 }),
      content: chance.paragraph({ sentences: 5 }),
    });
  }

  // Add one note that always has same id and title
  notes.push({
    id: "foo",
    createdAt: chance.date({ year: 2020, string: false }) as Date,
    index: notes.length,
    author: chance.name(),
    title: "foo doc",
    content: chance.paragraph({ sentences: 5 }),
  });
  return notes;
};

/**
 * Pretend this "notes" variable is a database for testing purposes
 */
export const NoteDB = generateNotes(50);
