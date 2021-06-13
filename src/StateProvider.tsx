import * as React from "react";

interface State {
  notes: Note[];
  setNotes(notes: Note[]): void;
  saveNote(note: Note): void;
}

const initialState: State = {
  setNotes: () => {},
  saveNote: () => {},
  notes: [],
};

export const StateContext = React.createContext(initialState);

const ThemeProvider: React.FunctionComponent = (props) => {
  const [state, setState] = React.useState(initialState);

  const setNotes = (notes: Note[]) => {
    setState({ ...state, notes });
  };

  const saveNote = (note: Note) => {
    const newNotes = [...state.notes];

    const noteIndexInArr = state.notes.findIndex((n) => n.id === note.id);

    if (noteIndexInArr === -1) {
      newNotes.unshift({
        ...note,
      });
    } else {
      newNotes[noteIndexInArr] = note;
    }

    setState({ ...state, notes: newNotes });
  };

  return (
    <StateContext.Provider
      value={{ ...state, setNotes, saveNote }}
      {...props}
    />
  );
};

export default ThemeProvider;

export const useAppState = () => {
  return React.useContext(StateContext);
};
