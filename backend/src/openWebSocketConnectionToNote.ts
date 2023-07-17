import ShareDB from "sharedb";
import WebSocket from "ws";

import { NoteDB } from "./notesDB";
import { WebSocketOpenConnectionMessage } from "@common/types";
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");

ShareDB.types.register(require("rich-text").type);
const shareDBServer = new ShareDB();

/**
 * Solution to real time collaboration on a note.
 */
export const openWebSocketConnectionToNote = (ws: WebSocket, action: WebSocketOpenConnectionMessage) => {
  const { noteId } = action.payload;
  const noteInMockDb = NoteDB.find(note => note.id === noteId);

  // Open new connection to ShareDB.
  const connection = shareDBServer.connect();
  
  // Define parameters for trying to get existing document from shareDb.
  const noteInShareDb = connection.get("documents", noteId);

  // Try to get existing document from shareDb.
  noteInShareDb.fetch(function (err) {
    if (err) throw err;

    if (noteInShareDb.type === null) {
      // If no note in share DB create it and use content from mock db
      // Share db is only used for long note and not for note title.
      noteInShareDb.create(
        [
          {
            insert: noteInMockDb?.content || "",
          },
        ],
        "rich-text",
        () => {
          const jsonStream = new WebSocketJSONStream(ws);
          shareDBServer.listen(jsonStream);
        }
      );
    } else {
      // If note already exists in ShareDB no need to create and just use it instead.
      const jsonStream = new WebSocketJSONStream(ws);
      shareDBServer.listen(jsonStream);
    }
  });
};
