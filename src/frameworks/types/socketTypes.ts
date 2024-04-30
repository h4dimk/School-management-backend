import { Server, Socket } from "socket.io";

import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IAnnouncement } from "../../entities/announcementEntity";
import { IMessage } from "../../entities/chatEntity";

export interface ServerToClientEvents {
  newAnnouncement: (announcement: IAnnouncement) => void;
  newMessage: (messageData: IMessage) => void;
  removedAnnouncement: (announcementId: string) => void;
}

export interface ClientToServerEvents {
  createAnnouncement: (announcementData: IAnnouncement) => void;
  addMessage: (messageData: IMessage) => void;
  removeAnnouncement: (announcementId: string) => void;
}

//socket server
export type TSocket = Server<
  ServerToClientEvents,
  ClientToServerEvents,
  DefaultEventsMap,
  any
>;

//socket client
export type TSocketMap = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  any
>;
