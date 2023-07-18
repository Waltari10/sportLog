import { useEffect, useMemo } from "react";

export const useWebSocketConnection = () => {
  // Creates a new websocket connection
  const webSocket = useMemo(() => new WebSocket("ws://localhost:8080"), []);

  useEffect(() => {
    return () => {
      webSocket?.close();
    };
  }, [webSocket]);

  return webSocket;
};
