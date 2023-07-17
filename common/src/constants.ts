export const UID = "test-user";

export const WebSocketOpenConnectionToNoteRoute = "OPEN_CONNECTION_TO_NOTE" as const;

// Use union type to add any other future actions to WebSocketAction;
export type WebSocketRoute = typeof WebSocketOpenConnectionToNoteRoute;