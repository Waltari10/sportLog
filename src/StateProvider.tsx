/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect } from "react";
import { ws } from "./websocket";

interface State {
  connected: boolean;
  setConnected(connected: boolean): void;
  notes: Note[];
  setNotes(notes: Note[]): void;
  saveNote(note: Note): void;
  loadingNotes: boolean;
  isSavingNote: boolean;
  setLoadingNotes(val: boolean): void;
  setIsSavingNote(val: boolean): void;
}

const initialState: State = {
  setConnected: () => {},
  connected: false,
  setNotes: () => {},
  saveNote: () => {},
  notes: [],
  isSavingNote: false,
  loadingNotes: false,
  setLoadingNotes: () => {},
  setIsSavingNote: () => {},
};

export const StateContext = React.createContext(initialState);

export type WSAction =
  // | "FETCH_ALL_NOTES"
  "OPEN_CONNECTION_TO_DOC" | "SAVE_NOTE";

export const wsRoutes = {
  OPEN_CONNECTION_TO_DOC: () => {},
  // FETCH_ALL_NOTES: (
  //   state: State,
  //   setState: (state: State) => void,
  //   parsedResponse: any
  // ) => {
  //   setState({
  //     ...state,
  //     notes: parsedResponse?.payload?.notes,
  //     loadingNotes: false,
  //   });
  // },
  SAVE_NOTE: (
    state: State,
    setState: (state: State) => void,
    parsedResponse: any
  ) => {
    const newNote = parsedResponse.payload.note;
    const newNotesArr = [...state.notes];

    const noteIndexInArr = state.notes.findIndex((n) => n.id === newNote.id);
    if (noteIndexInArr === -1) {
      newNotesArr.unshift(newNote);
    } else {
      newNotesArr[noteIndexInArr] = newNote;
    }

    setState({
      ...state,
      notes: newNotesArr,
      isSavingNote: false,
    });
  },
};

const StateProvider: React.FunctionComponent = (props) => {
  const [state, setState] = React.useState(initialState);

  useEffect(() => {
    ws.onmessage = (response) => {
      const parsedResponse = JSON.parse(response.data);
      const wsAction: WSAction = parsedResponse.type;
      if (wsRoutes[wsAction] && typeof wsRoutes[wsAction] === "function") {
        wsRoutes[wsAction](state, setState, parsedResponse);
      }
    };
    ws.onerror = (e) => {
      console.log("something went wrong", e);
      setState({ ...state, connected: false });
    };
    ws.onopen = () => {
      console.log("on open");
      setState({
        ...state,
        connected: true,
      });
    };
    ws.onclose = (e) => {
      console.log("on close", e.code, e.reason);
      setState({
        ...state,
        connected: false,
      });
    };
  }, []);

  const setNotes = (notes: Note[]) => {
    setState({ ...state, notes });
  };

  const setLoadingNotes = (val: boolean) =>
    setState({ ...state, loadingNotes: val });

  const setIsSavingNote = (val: boolean) =>
    setState({ ...state, isSavingNote: val });

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
      value={{ ...state, setNotes, saveNote, setLoadingNotes, setIsSavingNote }}
      {...props}
    />
  );
};

export default StateProvider;

export const useAppState = () => {
  return React.useContext(StateContext);
};
