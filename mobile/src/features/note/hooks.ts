import { useEffect, useState } from "react";
import { Note } from "@common/types";

import { useAppState } from "../../library/StateProvider";
import { getNotes, saveNote as saveNoteAPICall } from "./noteAPI";

interface UseGetNotesRes {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown | undefined;
  reload: () => void;
}

interface UseSaveNoteRes {
  saveNote: (note: Note) => Promise<Note | undefined>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown | undefined;
}

export const useGetNote = (noteId?: string): Note | undefined => {
  const appState = useAppState();

  return appState.notes.find(n => n.id === noteId);
};

// TODO: Use tanstack query instead
export const useSaveNote = (): UseSaveNoteRes => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<unknown>();
  const appState = useAppState();

  const saveNote = async (note: Note) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const res = await saveNoteAPICall(note);
      setIsSuccess(true);
      appState.saveNote(res);
      return res;
    } catch (err) {
      setError(err);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveNote, isLoading, isError, isSuccess, error };
};

// TODO: Use tanstack query instead
export const useGetNotes = (): UseGetNotesRes => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<unknown>();
  const appState = useAppState();

  const effectCallBack = () => {
    setIsLoading(true);
    setIsError(false);
    getNotes()
      .then(notes => {
        appState.setNotes(notes || []);
        setIsSuccess(true);
      })
      .catch(err => {
        setIsError(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectCallBack, []);
  return {
    notes: appState.notes,
    isLoading,
    isError,
    isSuccess,
    error,
    reload: effectCallBack,
  };
};