import Chance from "chance";

// Instantiate Chance so it can be used
const chance = new Chance();

export const generateNotes = (count: number) => {
  const notes: Note[] = [];

  for (let i = 0; i < count; i++) {
    notes.push({
      key: `${Math.random()}${Math.random()}${Math.random()}`,
      id: `${Math.random()}${Math.random()}${Math.random()}`,
      createdAt: new Date(),
      index: i,
      author: chance.name(),
      title: chance.sentence({ words: 4 }),
      note: chance.paragraph({ sentences: 5 }),
    });
  }
  return notes;
};
