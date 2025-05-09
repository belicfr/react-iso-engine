import {FC, useState} from "react";
import {Window} from "../../Window.tsx";
import "./RoomsNavigatorWindow.css";
import {TabsNavigation} from "../../../tabs-nav/TabsNavigation.tsx";
import Tab from "../../../tabs-nav/Tab.ts";
import Room from "../../../../../models/Room.ts";
import {RoomsList, RoomsListVisibility} from "./components/RoomsList.tsx";
import {Button} from "../../../buttons/Button.tsx";
import {CreateRoomWindow} from "../create-room/CreateRoomWindow.tsx";
import {Action} from "../../../../../frameworks/utilities/Actions.ts";

type Props = {
  rooms: Room[],

  onRoomClick: (room: Room) => void,
  onClose: Action,
};

export const RoomsNavigatorWindow: FC<Props> = ({rooms, onRoomClick, onClose}) => {
  const tabs: Tab[] = [
    new Tab("Public"),
    new Tab("All Rooms"),
    new Tab("My World"),
  ];

  const [ isCreateRoomWindowOpened, setIsCreateRoomWindowOpened ] = useState<boolean>(false);

  const [ currentTabIndex, setCurrentTabIndex ] = useState(0);

  const onTabChange = (index: number) => setCurrentTabIndex(index);

  return (
    <>
      <Window
        customHeaderClassName="room-navigator-window"
        dragHandleClassName="room-navigator-window"
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

          <div className="rooms-navigator__bottom">
            <Button
              color="light"

              onClick={() => setIsCreateRoomWindowOpened(true)}
            >

              Create Room
            </Button>
          </div>
        </div>
      </Window>

      {isCreateRoomWindowOpened &&
          <CreateRoomWindow
            onRoomCreate={room => onRoomClick(room)}
            onClose={() => setIsCreateRoomWindowOpened(false)}
          />}
    </>
  );
};