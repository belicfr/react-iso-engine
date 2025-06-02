import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {useConnection} from "../ConnectionContext.tsx";
import {HubConnection} from "@microsoft/signalr";
import {RestrictedUserDto} from "../../models/dto/restricted/RestrictedUserDto.ts";

export const UserContext = createContext<RestrictedUserDto|null>(null);

type Props = {
  children: ReactNode,
};

export const UserProvider: FC<Props> = ({children}) => {
  const [ user, setUser ] = useState<RestrictedUserDto|null>(null);
  const [ crowns, setCrowns ] = useState<number>(0);

  const connection: HubConnection = useConnection();

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceiveUserInfo", user => {
      console.log("Received User from WS", user);

      setUser(user);
      setCrowns(user.crowns);
    });

    connection.invoke("SendUserInfo");

    return () => {
      connection.off("ReceiveUserInfo");
      connection.stop();
    };
  }, []);

  if (!connection || !user) return (<></>);

  return (
    <UserContext.Provider value={{
      id: user.id,
      userName: user.userName,
      normalizedUserName: user.normalizedUserName,
      homeRoomId: user.homeRoomId,
      crowns,
      friends: user.friends,
      position: user.position,
    }}>

      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUser must be inside UserProvider");
  }

  return ctx;
}