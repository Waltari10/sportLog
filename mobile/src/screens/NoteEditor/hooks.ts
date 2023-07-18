import { useEffect, useMemo } from "react";
import { WEB_SOCKET_URI } from "appConstants";
import ShareDB from "sharedb/lib/client";
import { Socket } from "sharedb/lib/sharedb";

export const useWebSocketConnection = () => {
  // Creates a new websocket connection
  const webSocket = useMemo(() => new WebSocket(WEB_SOCKET_URI), []);

  useEffect(() => {
    return () => {
      webSocket?.close();
    };
  }, [webSocket]);

  return webSocket;
};

export const useNoteFromShareDB = (
  shareDBConnection: ShareDB.Connection,
  noteId: string
) => {
  return useMemo(
    () => shareDBConnection.get("documents", noteId),
    [noteId, shareDBConnection]
  );
};

export const useShareDbConnection = (ws: WebSocket) => {
  const connection = useMemo(() => {
    return new ShareDB.Connection(ws as Socket);
  }, [ws]);

  useEffect(() => {
    return () => connection.close();
  }, [connection]);

  return connection;
};
