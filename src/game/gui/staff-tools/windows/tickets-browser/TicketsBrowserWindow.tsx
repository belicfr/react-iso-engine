import {FC, useState} from "react";
import {Window} from "../../../windows/Window.tsx";
import {TabsNavigation} from "../../../tabs-nav/TabsNavigation.tsx";
import Tab from "../../../tabs-nav/Tab.ts";
import {Action} from "../../../../../frameworks/utilities/Actions.ts";

type Props = {
  onClose: Action,
};

export const TicketsBrowserWindow: FC<Props> = props => {
  const TABS = [
    new Tab("Opened"),
    new Tab("Picked"),
    new Tab("Resolved"),
  ];

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  return (
    <>
      <Window
        title="Tickets Browser"
        width="450px"
        height="250px"
        onClose={props.onClose}
      >

        {TABS.length &&
          <TabsNavigation
              currentTabIndex={currentTabIndex}
              tabs={TABS}

              onTabChange={index => setCurrentTabIndex(index)}
          >

            {currentTabIndex === 0 &&
              <>opened tickets browser;stub</>}

            {currentTabIndex === 1 &&
              <>picked tickets browser;stub</>}

            {currentTabIndex === 2 &&
              <>resolved tickets browser;stub</>}
          </TabsNavigation>}
      </Window>
    </>
  );
};