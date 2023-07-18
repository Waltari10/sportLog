// Not quaranteed unique but good enough for this tech demo. Would use some UUID library in real app.
export const UID = Math.random().toString(36).substring(2, 15);

export const WebSocketOpenConnectionToNoteRoute = "OPEN_CONNECTION_TO_NOTE" as const;

// Run rest server on this port and listen to it from mobile app
// Normally would maybe, but in .env file
export const REST_PORT = 8090;
export const WEB_SOCKET_PORT = 8080;
