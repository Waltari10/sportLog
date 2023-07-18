import { useEffect } from "react";
import { WebSocketOpenConnectionToNoteRoute } from "@common/constants";
import { Operations } from "features/note/utils";
import Sharedb from "sharedb/lib/client";

export const useListenToRemoteNoteChanges = (
  ws: WebSocket,
  shareDBNote: Sharedb.Doc,
  noteId: string,
  onOperation: (delta: { ops: Operations[] }, source: string) => void
) => {
  useEffect(() => {
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          route: WebSocketOpenConnectionToNoteRoute,
          payload: {
            noteId,
          },
        })
      );

      shareDBNote.subscribe((err: unknown) => {
        if (err) {
          throw err;
        }

        shareDBNote.on("op", (delta, source) => {
          // @ts-expect-error - ShareDB on event typing seems invalid or lacking. onOperation uses any type for some reason.
          onOperation(delta, source);
        });
      });
    };
  }, [noteId, onOperation, shareDBNote, ws]);
};
