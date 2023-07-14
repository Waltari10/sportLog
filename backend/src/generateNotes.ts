import chance from "./chance";
import { Note } from "./types";

export default (count: number) => {
  const notes: Note[] = [];

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
