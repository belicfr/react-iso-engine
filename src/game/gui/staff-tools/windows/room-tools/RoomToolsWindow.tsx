import {FC} from "react";
import {Window} from "../../../windows/Window.tsx";
import Room from "../../../../../models/Room.ts";
import {TabColumn} from "../../../windows/prefabs/room-preferences/components/TabColumn.tsx";
import "./RoomToolsWindow.css";
import {SmallButton} from "../../../buttons/SmallButton.tsx";
import {SessionRepository} from "../../../../../models/User.ts";
import Alert from "../../../../../models/Alert.ts";
import {Action, AlertAction} from "../../../../../frameworks/utilities/Actions.ts";

type Props = {
  room: Room,

  onOwnRoom: AlertAction,
  onClose: Action,
};

export const RoomToolsWindow: FC<Props> = ({room, onOwnRoom, onClose}) => {


  function ownRoom() {
    room.owner = SessionRepository.i().user;

    const alert: Alert = new Alert(
      Math.random(),
      "Staff Alert",
      `You own this room: **${room.name}**`,
    );

    SessionRepository.i().alerts.push(alert);
    onOwnRoom(alert);
  }

  function prepareInformation(): RoomInfo[] {
    return [
      {
        label: "ID:",
        value: room.id,
      },
      {
        label: "Players:",
        value: room.playersInRoomCount,
      },
      {
        label: "Players Limit:",
        value: room.playersLimit,
      },

      {
        label: "Having Rights:",
        value: room.havingRightsUsers.length,
      },
      {
        label: "Banned:",
        value: room.bannedUsers.length,
      },
      {
        label: "Banned Words:",
        value: room.bannedWords.length,
      },
    ];
  }

  return (
    <>
      <Window
        title="Room Tools"
        width="400px"
        height="300px"
        onClose={onClose}
      >

        <div className="room-tools__container">
          <TabColumn title={room.name}>
            <div className="room-tools__grid">
              {prepareInformation().map(info =>
                <p>
                  <strong>{info.label}</strong>
                  &nbsp;{info.value}
                </p>)}
            </div>
          </TabColumn>

          <div className="room-tools__actions">
            <SmallButton color="danger">
              Close Room
            </SmallButton>

            <SmallButton color="light">
              Room Alert
            </SmallButton>

            <SmallButton
              color="light"
              onClick={ownRoom}
            >

              Own Room
            </SmallButton>


            <SmallButton color="light">
              Owner Info
            </SmallButton>

            <SmallButton
              color="light"
              disabled={!room.group}
            >

              Group Info
            </SmallButton>

            <SmallButton color="light">
              Pick Furnis
            </SmallButton>
          </div>
        </div>
      </Window>


    </>
  );
};

type RoomInfo = {
  label: string,
  value: string|number,
};