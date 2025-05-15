import {CSSProperties, FC, ReactNode} from "react";

type Props = {
  cols?: number,

  children?: ReactNode,
};

export const Column: FC<Props> = ({cols = 1, children}) => {
  const styles: CSSProperties = {
    gridColumn: `${cols} span / ${cols} span`,
  };

  return (
    <>
      <div style={styles}>
        {children}
      </div>
    </>
  );
};