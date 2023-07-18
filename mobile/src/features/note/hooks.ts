import { useEffect } from "react";
import { Note } from "@common/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { minutesToMilliseconds } from "date-fns";
import { queryClient, queryKeys } from "library/tanstackQuery";

import { useAppState } from "../../library/StateProvider";
import { getNotes, saveNote as saveNoteAPICall } from "./noteAPI";

/**
 * Fetches a single note from app state. Doesn't make requests to backend
 */
export const useNote = (noteId?: string): Note | undefined => {
  const appState = useAppState();

  return appState.notes.find(n => n.id === noteId);
};

/**
 * Returns a function that can be used to save a note to backend database. Also keeps track of request state.
 */
export const useSaveNote = () => {
  const { mutateAsync, isLoading, error, data, isSuccess } = useMutation({
    mutationFn: saveNoteAPICall,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.getNotes });
    },
  });

  const isError = !!error;
  const appState = useAppState();

  useEffect(() => {
    if (data) {
      appState.saveNote(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { saveNote: mutateAsync, isLoading, isError, isSuccess, error, data };
};

/**
 * Fetches notes from backend database. Also keeps track of request state.
 */
export const useFetchNotes = () => {
  const { isLoading, error, data, isSuccess, refetch } = useQuery({
    cacheTime: minutesToMilliseconds(1),
    queryKey: queryKeys.getNotes,
    queryFn: () => getNotes(),
  });

  const appState = useAppState();

  const isError = !!error;

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      appState.setNotes(data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    notes: appState.notes,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  };
};
