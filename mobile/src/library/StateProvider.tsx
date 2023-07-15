import * as React from "react";
import { Note } from "@common/types";

type State = {
  connected: boolean;
  setConnected: (connected: boolean) => void;
  setNotes: (notes: Note[]) => void;
  saveNote: (note: Note) => void;
  notes: Note[];
};

const initialState: State = {
  connected: false,
  setConnected: () => {},
  setNotes: () => {},
  saveNote: () => {},
  notes: [],
};

type Props = {
  children?: React.ReactNode;
};

export const StateContext = React.createContext(initialState);

export const StateProvider = (props: Props) => {
  const [state, setState] = React.useState(initialState);

  const value = React.useMemo(
    () => ({
      ...state,
      saveNote: (note: Note) => {
        const newNotes = [...state.notes];

        const noteIndexInArr = state.notes.findIndex(n => n.id === note.id);

        if (noteIndexInArr === -1) {
          newNotes.unshift({
            ...note,
          });
        } else {
          newNotes[noteIndexInArr] = note;
        }

        setState({ ...state, notes: newNotes });
      },
      setNotes: (notes: Note[]) => {
        setState({ ...state, notes });
      },
    }),
    [state]
  );

  return <StateContext.Provider value={value} {...props} />;
};

export const useAppState = () => {
  return React.useContext(StateContext);
};
