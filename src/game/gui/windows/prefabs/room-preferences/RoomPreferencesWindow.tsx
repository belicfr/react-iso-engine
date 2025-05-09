import {FC, useMemo, useState} from "react";
import Room from "../../../../../models/Room.ts";
import {Window} from "../../Window.tsx";
import {TabsNavigation} from "../../../tabs-nav/TabsNavigation.tsx";
import Tab from "../../../tabs-nav/Tab.ts";
import {GeneralTab} from "./tabs/GeneralTab.tsx";
import "./RoomPreferencesWindow.css";
import {RightsTab} from "./tabs/RightsTab.tsx";
import {ModSettingsTab} from "./tabs/ModSettingsTab.tsx";
import {RoomWordsFilterWindow} from "../room-words-filter/RoomWordsFilterWindow.tsx";
import {Action} from "../../../../../frameworks/utilities/Actions.ts";

type Props = {
  room: Room,

  onClose: Action,
};

export const RoomPreferencesWindow: FC<Props> = ({room, onClose}) => {
  const TABS: Tab[] = useMemo(() => [
    new Tab("General"),
    new Tab("Rights"),
    new Tab("Mod Action"),
  ], []);

  const [ isWordsFilterWindowOpened, setIsWordsFilterWindowOpened ]
    = useState<boolean>(false);

  const [ currentTabIndex, setCurrentTabIndex ] = useState<number>(0);

  return (
    <>
      <Window
        title="Room Preferences"
        width="500px"
        height="350px"

        onClose={onClose}
      >

        <TabsNavigation
          tabs={TABS}
          currentTabIndex={currentTabIndex}

          onTabChange={(index: number) => setCurrentTabIndex(index)}
        >

          <div className="room-preferences__container">
            {currentTabIndex === Tabs.GENERAL &&
                <GeneralTab
                  room={room}
                />}

            {currentTabIndex === Tabs.RIGHTS &&
                <RightsTab
                  room={room}
                />}

            {currentTabIndex === Tabs.MOD_SETTINGS &&
                <ModSettingsTab
                  room={room}

                  onWordsFilterToggle={() => setIsWordsFilterWindowOpened(!isWordsFilterWindowOpened)}
                />}
          </div>
        </TabsNavigation>
      </Window>

      {isWordsFilterWindowOpened &&
          <RoomWordsFilterWindow
            room={room}

            onClose={() => setIsWordsFilterWindowOpened(false)}
          />}
    </>
  );
};

enum Tabs {
  GENERAL,
  RIGHTS,
  MOD_SETTINGS
}