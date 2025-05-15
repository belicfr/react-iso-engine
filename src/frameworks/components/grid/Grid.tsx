import {CSSProperties, FC, ReactNode} from "react";

type Props = {
  cols?: number,
  rows?: number,
  gap?: string,
  rowGap?: string,
  columnGap?: string,

  children?: ReactNode,
};

export const Grid: FC<Props> = (
  {
    cols, rows,
    gap, rowGap, columnGap,

    children
  }) => {

  const styles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: cols
      ? `repeat(${cols}, minmax(0, 1fr)`
      : undefined,
    gridTemplateRows: rows
      ? `repeat(${rows}, minmax(0, 1fr)`
      : undefined,
    gap,
    rowGap,
    columnGap,
  };

  return (
    <>
      <div style={styles}>
        {children}
      </div>
    </>
  )
};