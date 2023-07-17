import {
  WebSocketOpenConnectionToNoteRoute,
} from "@common/constants";

import {
  WebSocketMessage,
} from "@common/types";


import { openWebSocketConnectionToNote } from "openWebSocketConnectionToNote";
import WebSocket from "ws";

const webSocketAppRoutes = {
  OPEN_CONNECTION_TO_NOTE: openWebSocketConnectionToNote,
};

/**
 * Starts WebSocket server that is used to handle editing the notes in real time by multiple users.
 */
export const startWebSocketApp = () => {
  const webSocketPort = 8080;

  console.log(`starting websocket server on port:${webSocketPort}`);

  const websocketServer = new WebSocket.Server({ port: webSocketPort });

  /**
   * Start WebSocket server for collaboration on notes and listen to new connections.
   * msg.route defines which action to trigger. Only one websocket action now available.
   */
  websocketServer.on("connection", function connection(ws) {
    console.log("new connection");
    ws.on("message", (msg: string) => {
      console.log("WebSocket received message", msg);

      const parsedMsg = JSON.parse(msg) as WebSocketMessage;

      const routeName = parsedMsg.route;

      if (
        routeName === WebSocketOpenConnectionToNoteRoute &&
        webSocketAppRoutes[routeName] &&
        typeof webSocketAppRoutes[routeName] === "function"
      ) {
        webSocketAppRoutes[routeName](ws, parsedMsg);
      }
    });
  });
};
