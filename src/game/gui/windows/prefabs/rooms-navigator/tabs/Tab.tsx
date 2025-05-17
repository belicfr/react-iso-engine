import {FC} from "react";
import {RoomsList} from "../components/RoomsList.tsx";
import {RoomAction} from "../../../../../../frameworks/types/Actions.ts";
import {TabData} from "../Tabs.ts";
import "./RoomsTab.css";

type Props = TabData & {
  onRoomInfoClick: RoomAction,
  onRoomClick: RoomAction,
};

export const Tab: FC<Props> = ({categories, visibility, onRoomInfoClick, onRoomClick}) => {
  return (
    <>
      {categories.map(category =>
        <section className="rooms-navigator__section">
          <h6>{category.label}</h6>

          <RoomsList
            rooms={category.rooms}
            visibility={visibility}

            onRoomInfoClick={onRoomInfoClick}
            onRoomClick={onRoomClick}
          />
        </section>)}
    </>
  );
};