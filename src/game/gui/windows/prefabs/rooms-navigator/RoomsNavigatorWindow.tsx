import {FC, useEffect, useState} from "react";
import {Window} from "../../Window.tsx";
import "./RoomsNavigatorWindow.css";
import {TabsNavigation} from "../../../tabs-nav/TabsNavigation.tsx";
import Tab from "../../../tabs-nav/Tab.ts";
import {Button} from "../../../buttons/Button.tsx";
import {CreateRoomWindow} from "../create-room/CreateRoomWindow.tsx";
import {Action, RoomAction} from "../../../../../frameworks/types/Actions.ts";
import {RoomInfoWindow} from "../room-info/RoomInfoWindow.tsx";
import {useConnection} from "../../../../../io/ConnectionContext.tsx";
import {useRooms} from "../../../../../io/rooms/RoomsContext.tsx";
import {PublicRoomDto} from "../../../../../models/dto/public/PublicRoomDto.ts";
import {Tab as NavigatorTab} from "./tabs/Tab.tsx";
import {RoomsListVisibility} from "./components/RoomsList.tsx";

type Props = {
  onRoomClick: RoomAction,
  onClose: Action,
};

export const RoomsNavigatorWindow: FC<Props> = ({onRoomClick, onClose}) => {
  const tabs: Tab[] = [
    new Tab("Public", "PublicRooms"),
    new Tab("All Rooms", "AllRooms"),
    new Tab("My World", "PlayerRooms"),
  ];

  const [ isCreateRoomWindowOpened, setIsCreateRoomWindowOpened ] = useState<boolean>(false);
  const [ roomInfo, setRoomInfo ] = useState<PublicRoomDto|null>(null);

  const [ currentTabIndex, setCurrentTabIndex ] = useState(0);

  const [ isTabLoading, setIsTabLoading ] = useState<boolean>(false);

  const onTabChange = (index: number) => setCurrentTabIndex(index);

  const rooms = useRooms();

  const connection = useConnection();

  useEffect(() => {
    connection.invoke(`Send${tabs[currentTabIndex].channel!}`);
    setIsTabLoading(true);

    const handlerTabLoading = (response?: PublicRoomDto[]) => {
      if (response && response.length) {
        setIsTabLoading(false);
      }
    };

    connection.on(`Receive${tabs[currentTabIndex].channel!}`, handlerTabLoading);

    return () => {
      connection.off(`Receive${tabs[currentTabIndex].channel!}`, handlerTabLoading);
    };
  }, [connection, currentTabIndex]);

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

        <div
          className="rooms-navigator__content"
          style={isTabLoading ? {opacity: .6} : {}}
        >

          <TabsNavigation
            currentTabIndex={currentTabIndex}
            tabs={tabs}
            isLoading={isTabLoading}

            onTabChange={onTabChange}
          >

            {currentTabIndex === 0 &&
                <NavigatorTab
                    categories={[
                      {
                        label: "",
                        rooms: rooms,
                      },
                    ]}
                    visibility={RoomsListVisibility.LIST}

                    onRoomInfoClick={setRoomInfo}
                    onRoomClick={onRoomClick}
                />}

            {currentTabIndex === 1 &&
                <NavigatorTab
                    categories={[
                      {
                        label: "",
                        rooms: rooms,
                      },
                    ]}
                    visibility={RoomsListVisibility.COMPACT_LIST}

                    onRoomInfoClick={setRoomInfo}
                    onRoomClick={onRoomClick}
                />}

            {currentTabIndex === 2 &&
                <NavigatorTab
                    categories={[
                      {
                        label: "My Rooms",
                        rooms,
                      },
                      {
                        label: "Rooms with rights",
                        rooms,
                      },
                      {
                        label: "Rooms with friends",
                        rooms,
                      },
                    ]}
                    visibility={RoomsListVisibility.COMPACT_LIST}

                    onRoomInfoClick={setRoomInfo}
                    onRoomClick={onRoomClick}
                />}
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

      {roomInfo &&
          <RoomInfoWindow
              room={roomInfo}

              onClose={() => setRoomInfo(null)}
          />}
    </>
  );
};