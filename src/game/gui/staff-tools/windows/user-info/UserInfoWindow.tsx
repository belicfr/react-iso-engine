import {FC} from "react";
import {Window} from "../../../windows/Window.tsx";
import User from "../../../../../models/User.ts";
import {Action} from "../../../../../frameworks/types/Actions.ts";
import {TabColumn} from "../../../windows/prefabs/room-preferences/components/TabColumn.tsx";
import "./UserInfoWindow.css";
import {SmallButton} from "../../../buttons/SmallButton.tsx";
import {Grid} from "../../../../../frameworks/components/grid/Grid.tsx";
import {Column} from "../../../../../frameworks/components/grid/Column.tsx";

type Props = {
  user: User,

  onClose: Action,
};

export const UserInfoWindow: FC<Props> = ({user, onClose}) => {
  const data: DataRow[] = [
    {
      label: "ID:",
      value: user.id,
    },
    {
      label: "Username:",
      value: user.name,
    },
    {
      label: "Home ID:",
      value: user.home?.id,
    },
    {
      label: "Current Room:",
      value: user.currentRoom
        ? `[${user.currentRoom.id}] ${user.currentRoom.name}`
        : undefined,
    },
    {
      label: "IP:",
      value: user.ip,
    },
    {
      label: "Rank:",
      value: `[${user.rank.id}] ${user.rank.name}`,
    },
  ];

  return (
    <>
      <Window
        title={`User Info: ${user.name}`}
        width="500px"
        height="auto"
        onClose={onClose}
      >

        <div className="user-info__container">
          <Grid
            cols={3}
            columnGap="10px"
          >

            <Column cols={2}>
              <TabColumn>
                <div className="data-list">
                  {data.filter(d => d.value).map(row =>
                    <p>
                      <strong>{row.label}</strong>
                      &nbsp;{row.value}
                    </p>)}
                </div>
              </TabColumn>
            </Column>

            <Column>
              <div className="user-info__actions">
                <SmallButton color="light">
                  MOD Action
                </SmallButton>

                <SmallButton color="light">
                  Notification
                </SmallButton>

                <SmallButton color="light">
                  Room Visits
                </SmallButton>

                <SmallButton color="success">
                  Join Room
                </SmallButton>

                <SmallButton color="danger">
                  Speed Ban
                </SmallButton>
              </div>
            </Column>
          </Grid>
        </div>
      </Window>
    </>
  );
};

type DataRow = {
  label: string,
  value?: string | number,
};