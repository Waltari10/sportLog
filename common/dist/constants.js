"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB_SOCKET_PORT = exports.REST_PORT = exports.WebSocketOpenConnectionToNoteRoute = exports.UID = void 0;
// Not quaranteed unique but good enough for this tech demo. Would use some UUID library in real app.
exports.UID = Math.random().toString(36).substring(2, 15);
exports.WebSocketOpenConnectionToNoteRoute = "OPEN_CONNECTION_TO_NOTE";
// Run rest server on this port and listen to it from mobile app
// Normally would maybe, but in .env file
exports.REST_PORT = 8090;
exports.WEB_SOCKET_PORT = 8080;
