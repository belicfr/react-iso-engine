import {createContext, ReactNode, FC, useState, useEffect, useContext} from "react";
import {HubConnection} from "@microsoft/signalr";
import {useConnection} from "../ConnectionContext.tsx";
import {PublicRoomTemplateDto} from "../../models/dto/public/PublicRoomTemplateDto.ts";

export const RoomTemplatesContext = createContext<PublicRoomTemplateDto[]>([]);

type Props = {
  children: ReactNode,
};

export const RoomTemplatesProvider: FC<Props> = ({children}) => {
  const [ templates, setTemplates ] = useState<PublicRoomTemplateDto[]>([]);

  const connection: HubConnection = useConnection();

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceiveRoomTemplates", retrievedTemplates => {
      console.log("RECEIVED ROOM TEMPLATES", retrievedTemplates);
      setTemplates(retrievedTemplates);
    });

    return () => {
      connection.off("ReceiveRoomTemplates");
    };
  }, []);

  return (
    <RoomTemplatesContext.Provider value={templates}>
      {children}
    </RoomTemplatesContext.Provider>
  );
};

export function useRoomTemplates() {
  const ctx = useContext(RoomTemplatesContext);

  if (!ctx) {
    throw new Error("useRoomTemplates must be inside RoomTemplatesProvider");
  }

  return ctx;
}