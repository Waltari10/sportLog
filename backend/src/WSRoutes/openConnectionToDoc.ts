import ShareDB from "sharedb";
import WebSocket from "ws";
import { notes } from "../notesDB";
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");

ShareDB.types.register(require("rich-text").type);
const shareDBServer = new ShareDB();

export default (ws: WebSocket, action: any) => {
  const docId = action.payload.docId;

  const connection = shareDBServer.connect();

  const doc = connection.get("documents", docId);

  doc.fetch(function (err) {
    if (err) throw err;

    const note = notes.find((note) => note.id === docId);

    if (doc.type === null) {
      // Create new doc in DBShare memory
      doc.create(
        [
          {
            insert: note?.content || "not found",
          },
        ],
        "rich-text",
        () => {
          const jsonStream = new WebSocketJSONStream(ws);
          shareDBServer.listen(jsonStream);
        }
      );
      return;
    } else {
      // Use existing doc in DBShare memory
      const jsonStream = new WebSocketJSONStream(ws);
      shareDBServer.listen(jsonStream);
    }
  });
};
