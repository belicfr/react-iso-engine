import {createContext, FC, ReactNode, useContext, useState} from "react";
import {PublicAlertDto} from "../../../models/dto/public/PublicAlertDto.ts";

type AlertsContextType = {
  alerts: PublicAlertDto[],
  addAlert: (alert: PublicAlertDto) => void,
  removeAlert: (id: number) => void,
};

const AlertsContext = createContext<AlertsContextType|null>(null);

type Props = {
  children: ReactNode,
};

export const AlertsProvider: FC<Props> = ({children}) => {
  const [ alerts, setAlerts ] = useState<PublicAlertDto[]>([]);

  const addAlert = (alert: PublicAlertDto) => {
    setAlerts(prevState => [...prevState, alert]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prevState => prevState.filter(a => a.id !== id));
  };

  return (
    <AlertsContext.Provider value={{alerts, addAlert, removeAlert}}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);

  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }

  return context;
};