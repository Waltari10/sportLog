/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

interface State {
  connected: boolean;
  setConnected(connected: boolean): void;
  notes: Note[];
  setNotes(notes: Note[]): void;
  saveNote(note: Note): void;
}

const initialState: State = {
  setConnected: () => {},
  connected: false,
  setNotes: () => {},
  saveNote: () => {},
  notes: [],
};

export const StateContext = React.createContext(initialState);

const StateProvider: React.FunctionComponent = (props) => {
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

export default StateProvider;

export const useAppState = () => {
  return React.useContext(StateContext);
};
