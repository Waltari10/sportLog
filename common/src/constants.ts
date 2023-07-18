// Not quaranteed unique but good enough for this tech demo. Would use some UUID library in real app.
export const UID = Math.random().toString(36).substring(2, 15);

export const WebSocketOpenConnectionToNoteRoute = "OPEN_CONNECTION_TO_NOTE" as const;

// Use union type to add any other future actions to WebSocketAction;
export type WebSocketRoute = typeof WebSocketOpenConnectionToNoteRoute;