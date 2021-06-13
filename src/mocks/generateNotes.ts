import Chance from "chance";

const chance = new Chance();

export const generateNotes = (count: number) => {
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
  return notes;
};
