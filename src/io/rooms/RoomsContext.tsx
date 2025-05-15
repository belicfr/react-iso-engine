import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {PublicRoomDto} from "../../models/dto/public/PublicRoomDto.ts";
import {HubConnection} from "@microsoft/signalr";
import {useConnection} from "../ConnectionContext.tsx";

export const RoomsContext = createContext<PublicRoomDto[]>([]);

type Props = {
  children: ReactNode,
};

export const RoomsProvider: FC<Props> = ({children}) => {
  const [ rooms, setRooms ] = useState<PublicRoomDto[]>([]);

  const connection: HubConnection = useConnection();

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceivePublicRooms", retrievedRooms => {
      setRooms(retrievedRooms);
    });

    connection.on("ReceiveAllRooms", retrievedRooms => {
      setRooms(retrievedRooms);
    });

    connection.on("ReceivePlayerRooms", retrievedRooms => {
      setRooms(retrievedRooms);
    });

    connection.on("ReceiveRoom", room => {
      console.log("RECEIVED ROOM", room);
    });

    connection.on("ReceiveRoomEnterAttempt", response => {
      console.log("ROOM ENTER ATTEMPT RESPONSE", response);
    });

    connection.on("ReceiveNewRoomName", response => {
      console.log("NEW ROOM NAME", response);
    });

    connection.on("ReceiveNewRoomDescription", response => {
      console.log("NEW ROOM DESCRIPTION", response);
    });

    connection.on("ReceiveNewRoomTag", response => {
      console.log("NEW ROOM TAG", response);
    });

    connection.on("ReceiveNewRoomRight", response => {
      console.log("NEW ROOM RIGHT", response);
    });

    connection.on("ReceiveRemoveRoomRight", response => {
      console.log("REMOVED ROOM RIGHT", response);
    });

    connection.on("ReceiveBanUserFromRoom", response => {
      console.log("USER BAN FROM ROOM", response);
    });

    connection.on("ReceiveUnbanUserFromRoom", response => {
      console.log("USER UNBAN FROM ROOM", response);
    });

    connection.on("ReceiveUnbanAllFromRoom", response => {
      console.log("UNBAN ALL FROM ROOM", response);
    });

    connection.on("ReceiveRoomUpdate", response => {
      console.log("RECEIVED UPDATED ROOM", response);
    });

    return () => {
      connection.off("ReceivePublicRooms");
      connection.off("ReceiveAllRooms");
      connection.off("ReceivePlayerRooms");

      connection.off("ReceiveRoom");

      connection.off("ReceiveRoomEnterAttempt");

      connection.off("ReceiveNewRoomName");
      connection.off("ReceiveNewRoomDescription");
      connection.off("ReceiveNewRoomTag");

      connection.off("ReceiveNewRoomRight");
      connection.off("ReceiveRemoveRoomRight");

      connection.off("ReceiveBanUserFromRoom");
      connection.off("ReceiveUnbanUserFromRoom");
      connection.off("ReceiveUnbanAllFromRoom");

      connection.off("ReceiveRoomUpdate");
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>
      {children}
    </RoomsContext.Provider>
  );
};

export function useRooms() {
  const ctx = useContext(RoomsContext);

  if (!ctx) {
    throw new Error("useRooms must be inside RoomsProvider");
  }

  return ctx;
}