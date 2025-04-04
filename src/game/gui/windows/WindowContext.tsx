import {createContext, FC, ReactNode, useContext, useState} from "react";

type ZIndexContextType = {
  highestZIndex: number;
  bringToFront: () => number;
};

type Props = {
  children: ReactNode,
};

const ZIndexContext = createContext<ZIndexContextType|undefined>(undefined);

export const ZIndexProvider: FC<Props> = props => {
  const [ highestZIndex, setHighestZIndex ] = useState(90);

  const bringToFront = () => {
    setHighestZIndex(prevState => prevState + 1);

    return highestZIndex;
  };

  return (
    <ZIndexContext.Provider value={{ highestZIndex, bringToFront }}>
      {props.children}
    </ZIndexContext.Provider>
  );
};

export const useZIndex = () => {
  const context = useContext(ZIndexContext);

  if (!context) {
    throw new Error("useZIndex must be used within a ZIndexProvider");
  }

  return context;
}