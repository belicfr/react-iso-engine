import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {HubConnection} from "@microsoft/signalr";
import createConnection from "./server.ts";

export const ConnectionContext = createContext<HubConnection|null>(null);

type Props = {
  children: ReactNode,
};

export const ConnectionProvider: FC<Props> = ({children}) => {
  const [ connection, setConnection ] = useState<HubConnection|null>(null);

  useEffect(() => {
    const newConnection = createConnection();

    newConnection
      .start()
      .then(() => {
        console.log("SignalR connection started", connection, newConnection);
        setConnection(newConnection);
      })
      .catch((err) => console.error("SignalR connection error:", err));

    return () => {
      console.log("check stop");
      newConnection
        .stop();
    };
  }, []);

  console.log("check state", connection?.state);

  if (!connection || connection.state !== "Connected") {
    return (<p style={{color: "white"}}>Loading...</p>);
  }

  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error("useConnection must be used within a Connection Provider");
  }

  return context;
};