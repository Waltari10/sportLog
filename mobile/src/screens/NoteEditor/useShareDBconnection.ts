import { useEffect, useMemo } from "react";
import Sharedb from "sharedb/lib/client";
import { Socket } from "sharedb/lib/sharedb";

export const useShareDbConnection = (ws: WebSocket) => {
  const connection = useMemo(() => {
    return new Sharedb.Connection(ws as Socket);
  }, [ws]);

  useEffect(() => {
    return () => connection.close();
  }, [connection]);

  return connection;
};
