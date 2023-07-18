
import { WebSocketOpenConnectionToNoteRoute } from './constants';

export type WebSocketOpenConnectionMessage = {
  route: typeof WebSocketOpenConnectionToNoteRoute;
  payload: {
    noteId: string;
  }
}

// Use union type to combine different message types in future
export type WebSocketMessage = WebSocketOpenConnectionMessage

export type Note = {
    createdAt?: Date;
    index?: number;
    author?: string;
    title?: string;
    content?: string;
    id: string;
  }
  