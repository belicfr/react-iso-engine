import {FC, useState} from "react";
import {Window} from "../../Window.tsx";
import "./RoomsNavigatorWindow.css";
import {TabsNavigation} from "../../../tabs-nav/TabsNavigation.tsx";
import Tab from "../../../tabs-nav/Tab.ts";
import Room from "../../../../../models/Room.ts";
import User from "../../../../../models/User.ts";
import {RoomsList, RoomsListVisibility} from "./RoomsList.tsx";

type Props = {
  onClose: () => void,
};

export const RoomsNavigatorWindow: FC<Props> = props => {
  const tabs: Tab[] = [
    new Tab("Public"),
    new Tab("All Rooms"),
    new Tab("My World"),
  ];

  const publicRooms: Room[] = [
    new Room(2, "Le Café", new User(1, "officialrooms"), ["public"], 100, 100),
    new Room(1, "Hotel Hall", new User(1, "officialrooms"), ["fun", "lol"], 75, 10),
    new Room(3, "Games Lounge", new User(1, "officialrooms"), [], 25, 10),
  ];

  const allRooms: Room[] = [
    ...publicRooms,
    new Room(4, "Gamers HQ | friendly&fun", new User(2, "MrPlayer"), ["gamers"], 25, 5),
  ];

  const [ currentTabIndex, setCurrentTabIndex ] = useState(0);

  const onTabChange = (index: number) => setCurrentTabIndex(index);

  return (
    <>
      <Window
        title="Rooms Navigator"
        width="500px"
        height="600px"
        onClose={props.onClose}
      >

        <div className="rooms-navigator__content">
          <TabsNavigation
            currentTabIndex={currentTabIndex}
            tabs={tabs}
            onTabChange={onTabChange}
          >

            {currentTabIndex === 0 &&
                <RoomsList
                    rooms={publicRooms}
                    visibility={RoomsListVisibility.LIST} />}

            {currentTabIndex === 1 &&
                <RoomsList
                    rooms={allRooms}
                    visibility={RoomsListVisibility.COMPACT_LIST} />}

            {currentTabIndex === 2 &&
                <p>my rooms;stub</p>}
          </TabsNavigation>
        </div>
      </Window>
    </>
  );
};