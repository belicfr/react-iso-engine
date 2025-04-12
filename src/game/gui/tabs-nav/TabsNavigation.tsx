import {FC, ReactNode} from "react";
import Tab from "./Tab.ts";
import "./TabsNavigation.css";

type Props = {
  currentTabIndex: number,
  tabs: Tab[],

  children: ReactNode,

  onTabChange: (index: number) => void,
};

export const TabsNavigation: FC<Props> = props => {
  return (
    <>
      <div className="tabs-navigation">
        <div className="tabs-navigation__container">
          {props.tabs.map((tab, index) =>
            <div
              className={
                "tabs-navigation__tab-button" +
                (props.currentTabIndex === index
                  ? " active"
                  : "")
              }
              key={index}
              onClick={() => props.onTabChange(index)}
            >

              {tab.label}
            </div>
          )}
        </div>

        <main className="tabs-navigation__body">
          {props.children}
        </main>
      </div>
    </>
  );
};