import WebSocket from "ws";
import { wsRoutes } from "./WSRoutes";
import { WSAction } from "./WSRoutes/types";
import { Chance } from "chance";
import { UID } from '@common/constants'

import express from "express";
import { notes } from "./notesDB";
import { Note } from "@common/types";

const chance = new Chance();

const bodyParser = require("body-parser");
console.log({UID})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const WSPort = 8080;
const restPort = 8090;

console.log("starting websocket server on port:" + WSPort);
const wss = new WebSocket.Server({ port: WSPort });

app.get("/getNotes", (req: any, res: any) => {
  console.log("getNotes");
  return res.send(JSON.stringify(notes));
});

app.post("/saveNote", (req, res: any) => {
  let newNote: Note = req.body as Note;
  try {
    const noteIndexInArr = notes.findIndex((n) => n.id === newNote.id);
    if (noteIndexInArr === -1) {
      console.log("new note");
      // Simulates backend adding createdAt, index and id...
      newNote = {
        ...newNote,
        index: notes.length,
        id: chance.guid(),
        createdAt: new Date(),
      };
      notes.unshift(newNote);
    } else {
      console.log("existing note");
      notes[noteIndexInArr] = newNote;
    }

    res.send(newNote);
  } catch (err) {
    res.send(err);
  }
});

app.listen(restPort, () =>
  console.log(`SportLog rest server listening on port ${restPort}!`)
);

wss.on("connection", function connection(ws) {
  console.log("new connection");
  ws.on("message", (msg: any) => {
    console.log("message", msg);
    const parsedMsg = JSON.parse(msg);
    const action = parsedMsg.type as WSAction;

    if (wsRoutes[action] && typeof wsRoutes[action] === "function") {
      wsRoutes[action](ws, parsedMsg);
    }
  });
});
