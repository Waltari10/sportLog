import { WebSocketOpenConnectionToNoteRoute } from './constants';
export type WebSocketOpenConnectionMessage = {
    route: typeof WebSocketOpenConnectionToNoteRoute;
    payload: {
        noteId: string;
    };
};
export type WebSocketMessage = WebSocketOpenConnectionMessage;
export type Note = {
    createdAt?: Date;
    index?: number;
    author?: string;
    title?: string;
    content?: string;
    id: string;
};
//# sourceMappingURL=types.d.ts.map