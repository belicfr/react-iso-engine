import {FC, useState} from "react";
import {Window} from "../../Window.tsx";
import "./RoomsNavigatorWindow.css";
import {TabsNavigation} from "../../../tabs-nav/TabsNavigation.tsx";
import Tab from "../../../tabs-nav/Tab.ts";
import Room from "../../../../../models/Room.ts";
import {RoomsList, RoomsListVisibility} from "./RoomsList.tsx";

type Props = {
  rooms: Room[],

  onRoomClick: (room: Room) => void,
  onClose: () => void,
};

export const RoomsNavigatorWindow: FC<Props> = ({rooms, onRoomClick, onClose}) => {
  const tabs: Tab[] = [
    new Tab("Public"),
    new Tab("All Rooms"),
    new Tab("My World"),
  ];

  const [ currentTabIndex, setCurrentTabIndex ] = useState(0);

  const onTabChange = (index: number) => setCurrentTabIndex(index);

  return (
    <>
      <Window
        title="Rooms Navigator"
        width="500px"
        height="600px"
        onClose={onClose}
      >

        <div className="rooms-navigator__content">
          <TabsNavigation
            currentTabIndex={currentTabIndex}
            tabs={tabs}
            onTabChange={onTabChange}
          >

            {currentTabIndex === 0 &&
                <RoomsList
                  rooms={rooms}
                  visibility={RoomsListVisibility.LIST}

                  onRoomClick={onRoomClick}
                />}

            {currentTabIndex === 1 &&
                <RoomsList
                  rooms={rooms}
                  visibility={RoomsListVisibility.COMPACT_LIST}

                  onRoomClick={onRoomClick}
                />}

            {currentTabIndex === 2 &&
                <p>my rooms;stub</p>}
          </TabsNavigation>
        </div>
      </Window>
    </>
  );
};