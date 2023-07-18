import { useMemo } from "react";
import sharedb from "sharedb/lib/client";

export const useNoteFromShareDB = (
  shareDBConnection: sharedb.Connection,
  noteId: string
) => {
  return useMemo(
    () => shareDBConnection.get("documents", noteId),
    [noteId, shareDBConnection]
  );
};
